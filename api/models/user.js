const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secret = require('../../config/config').SECRET;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
    index: true
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.S+/, 'is invalid'],
    index: true
  },
  admin: {type: Boolean, default: false},
  imageSrc: {
    type: String,
    default: './uploads/default/placeholder.jpeg'
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'location'
  }],
  hash: String,
  salt: String
}, {timestamps: true});

UserSchema.plugin(uniqueValidator, {message: '{PATH} is already taken'});

UserSchema.methods.validPassword = function(password){
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
}

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
}

UserSchema.methods.generateJWT = function(){
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000)
  })
}

UserSchema.methods.toAuthJSON = function(){
  return {
    id: this._id,
    username: this.username,
    email: this.email,
    token: this.generateJWT(),
    imageSrc: this.imageSrc
  }
}

UserSchema.methods.favorite = function(id){
  if(this.favorites.indexOf(id) === -1){
    this.favorites.unshift(id);
  }

  return this.save();
}

UserSchema.methods.unfavorite = function(id){
  this.favorites.remove(id);
  return this.save()
}

UserSchema.methods.isfavorite = function(id){
  return this.favorites.some(function(favoriteId){
    return favoriteId.toString() === id.toString();
  })
}

const User = mongoose.model('user', UserSchema);

module.exports = User;