const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('mongoose').model('user');

// login
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, done) => {
  User.findOne({email: email})
  .then(user => {
    if(!user || !user.validPassword(password)){
      return done(null, false, {errors: {error: 'Email or password is invalid'}})
    }

    return done(null, user)
  })
  .catch(done)
}))