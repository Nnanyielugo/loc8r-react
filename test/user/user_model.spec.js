const chai = require('chai');
const chaiHttp = require('chai-http')
const User = require('mongoose').model('user');
const config = require('../../config/config');
const expect = chai.expect;

chai.use(chaiHttp);
require('../../api/models/user');


describe('User model', function(){
  
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

  beforeEach(function(done){
    User.remove({}, function(){
      done()
    })
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

    describe('Create user tests', function(){
      beforeEach(function(done){
        User.remove({}, function(){})
        done()
      })

      afterEach(function(done){
        User.remove({}, function(){
          done()
        })
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
})