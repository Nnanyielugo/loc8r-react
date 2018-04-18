const chai = require('chai');
const chaiHttp = require('chai-http');
const User = require('mongoose').model('user');
const config = require('../../config/config');

const expect = chai.expect;
chai.use(chaiHttp);
require('../../api/models/user');

describe('User Routes', function(){

  beforeEach(function(done){
    User.remove({}, function(){
      done()
    })
  });

  const login = {
    user: {
      email: "jabi@email.com",
      password : "jabinco"
    }
  }

  const user = {
    username: "Jabinco",
    email: "jabi@email.com",
    password : "jabinco"
  }

  const invalidEmail = {
    username: "Jabinco",
    email: "jabi",
    password : "jabinco"
  }

  const app = require('../../app');
  
  describe('Sign up tests', function(){
    it('returns 200', function(done){
      chai.request(app)
        .post('/api/users/')
        .send(user)
        .end((error, response) => {
          expect(response).to.have.status(200)
          expect(error).to.be.null
          done()
        })
    })
  
    it('returns 500 and error message if email is invalid', function(done){
      chai.request(app)
        .post('/api/users/')
        .send(invalidEmail)
        .end((err, response) => {
          expect(response).to.have.status(500)
          expect(response.body).to.be.a('object')
          expect(response.body).to.have.property('errors')
          expect(response.body.errors).to.have.property('message')
          expect(response.body.errors.message).to.equal("user validation failed: email: is invalid")
          done()
        })
    })
  
    it('does not return 500 if required fields are present', function(done){
      chai.request(app)
        .post('/api/users/')
        .send(user)
        .then(response => {
          expect(response).to.not.have.status(500)
          done()
        })
    })
  
    it('returns properties of user in db', function(done){
      chai.request(app)
        .post('/api/users/')
        .send(user)
        .then(() =>{
          return  User.find({
            email: user.email
          });
        })
        .then(result => {
          const userObj = result[0];
  
          expect(userObj.username).to.equal(user.username.toLowerCase())
          expect(userObj.email).to.equal(user.email.toLowerCase())
          expect(userObj).to.have.property('hash')
          expect(userObj).to.have.property('salt')
          expect(userObj).to.have.property('isAdmin')
          expect(userObj).to.have.property('imageSrc')
          expect(userObj.isAdmin).to.be.a('boolean')
          done()
        })
        .catch(done)
    })
  })

  describe('Testing Authentication', function(){

    it('Should register, and login', function(done){
      chai.request(app)
        .post('/api/users/')
        .send(user)
        .end((error, resp) => {
          expect(error).to.be.null;
          expect(resp).to.not.have.status(500)
          expect(resp).to.have.status(200)
          
          chai.request(app)
          .post('/api/users/login')
          .send(login)
          .end((error, response) => {
            // console.log(response.body)
            expect(response).to.be.a('object');
            expect(response).to.not.be.null
            expect(response.body.user.username).to.equal(user.username.toLowerCase());
            expect(response.body.user.email).to.equal(user.email)
            expect(response.body.user.token).to.exist;

            done()              
          })
        })        
    })

    it('should return 401 on unauthenticated requests', function(done){
      chai.request(app)
        .post('/api/users/login')
        .send(login)
        .end((err, res) => {
          //console.log(res.body)
          expect(res.body).to.have.property('errors')
          expect(res.body.errors).to.have.property('error')
          expect(res.body.errors.error).to.equal('Email or password is invalid')
          done()
        })
    })

    it('Should return UnauthorizedError if token is not present in header', function(done){
      chai.request(app)
        .post('/api/users/')
        .send(user)
        .end((error, resp) => {
          expect(error).to.be.null;
          expect(resp).to.not.have.status(500)
          expect(resp).to.have.status(200)
          
          chai.request(app)
          .post('/api/users/login')
          .send(login)
          .end((error, response) => {
            // console.log(response.body)
            expect(response).to.be.a('object');
            expect(response).to.not.be.null
            expect(response.body.user.username).to.equal(user.username.toLowerCase());
            expect(response.body.user.email).to.equal(user.email)
            expect(response.body.user.token).to.exist;

            let token = response.body.user.token;

            chai.request(app)
              .get('/api/users/me')
              .set('Authorization', 'Bearer')
              .end((err, res) => {
                console.log('Auth ', res.body)
                expect(res).to.have.status(401)
                expect(res.body).to.have.property('errors')
                expect(res.body.errors).to.have.property('error')
                expect(res.body.errors.error).to.have.property('name')
                expect(res.body.errors.error.name).to.equal('UnauthorizedError')
                
                
                done()
              })
              
          })
        })
    })
  })

  describe('Protected routes', function(){
    let token;
      const testUser = {
        username: "kizzy",
        email: "kizzy@email.com",
        password : "kizito"
      }
      // let test = new User(testUser);
  
      beforeEach(function(done){  
          chai.request(app)
            .post('/api/users/')
            .send(testUser)
            .end((err, res)=> {
              if(err) done(err)
              //console.log(res.body)
              token = res.body.user.token;
              done()
            })
      
      });

      it('should access protected user route', function(done){
        chai.request(app)
          .get('/api/users/me')
          .set('Authorization', 'Bearer ' + token)
          .end((err, response)=> {
            // console.log(response.body)
            expect(response).to.have.status(200)
            expect(response.body).to.have.property('user')
            expect(response.body.user.username).to.equal(testUser.username)
            expect(response.body.user.email).to.equal(testUser.email)
            expect(response.body.user).to.have.property('token')
            expect(response.body.user.token).to.not.be.null;
            done()
          })
      })
    
  })
})