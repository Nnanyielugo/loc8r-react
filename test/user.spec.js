const mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http')
require('../api/models/user');
const mockgoose = new Mockgoose(mongoose)
const User = mongoose.model('user')

chai.use(chaiHttp);
let config = require('../config/config');

// process.env.NODE_ENV = 'test';

before(function(done){
  // if(process.env.NODE_ENV !== 'test'){
  //   throw new Error(`[ENV -> ${process.env.NODE_ENV}]. This method should only be run on a test environment.\nTry setting env to test`)
  // }
  mongoose.connect(config.DB_URL);
  const db = mongoose.connection;

  User.count({})
    .then(function(count){
      if(count === 0){
        console.log('not exists')
      } else {
        console.log("EXISTS")
        // User.remove()
      }
    })

  db.on('error', function(err){
    console.log('Error connecting to', config.DB_URL + ': ' + err)
  })
  db.on('connected', function(){
    console.log('Mongoose connected to', config.DB_URL)
    done()
  })
  db.on('open', function(){
    db.dropDatabase(function(err, result){
      if(err){
        console.log(err)
      }
      console.log('db dropped')
    })
  })
})

let user =  {
  username: "Nnanyi",
  email: 'Nnayi@gmail.com',
}

let noUsername = {
  email: 'Nnanyi@gmail.com'
}

let noEmail = {
  username: "Nnanyi"
}


describe('User model', function(){

  beforeEach(function(done){
    User.remove({}, function(){})
    done()
  });

  describe('Mongoose checks', function(){
    describe('Validation error', function(){
      it('Should throw validation error if email field is blank ', function(done){
        User.create(noEmail, function(err){
          expect(err.message).to.equal("user validation failed: email: can't be blank")
        })
        done()
      })
  
      it('Should throw validation error if username field is blank ', function(done){
        User.create(noUsername, function(err){
          expect(err.message).to.equal("user validation failed: username: can't be blank")
        })
        done()
      })
    })
  
    describe('UserModel should create without errors if required fields are present', function(){
      it('Should not contain errors if required fields are provided', function(done){
        User.create(user, function(err){
          expect(err).to.be.null
        })
        done()
      });
    })

    describe('Create user', function(){
      beforeEach(function(done){
        User.remove({}, function(){})
        done()
      })

      afterEach(function(done){
        User.remove({}, function(){})
        done()
      })
      it('Should create user and the created fields should exist', function(){
        return new User(user).save().then(function(result){
          expect(result).to.exist;
          expect(result._id).to.exist;
          expect(result.username).to.exist;
          expect(result.email).to.exist;
        })
      })

      it('Created fields should equal the properties of the object they were created from', function(){
        return new User(user).save().then(function(result){
          expect(result.username.toLowerCase()).to.equal(user.username.toLowerCase());
          expect(result.email.toLowerCase()).to.equal(user.email.toLowerCase());
        })
      })
    })
  })  

  describe('Create user tests', function(){

    beforeEach(function(done){
      User.remove({}, function(){})
      done()
    });

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

    const app = require('../app');
    it('returns 200', function(done){
      chai.request(app)
        .post('/api/users/')
        .send(user)
        .then(response => {
          expect(response).to.have.status(200)
          done()
        })
    })

    it('returns 500 if email is invalid', function(done){
      chai.request(app)
        .post('/api/users/')
        .send(invalidEmail)
        .then(response => {
          expect(response).to.have.status(500)
          done()
        })
    })

    it('does not return 500', function(done){
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
          done()
        })
        .catch(done)
    })
  })

})