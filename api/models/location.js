const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const User = mongoose.model('user');

const openingTimeSchema = new mongoose.Schema({
  days: { type: String, required: true },
  opening: String,
  closing: String,
  closed: { type: Boolean, required: true }
});

const reviewSchema = new mongoose.Schema({
  author: {type: String, required: true},
  rating: {type: Number, required: true, min: 0, max: 5},
  review: {type: String, required: true},
  createdOn: {type: Date, "default": Date.now}
})

const LocationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  rating: { type: Number, default: 0, min: 0, max: 5 },
  facilities: [String],
  favoritesCount: {type: Number, default: 0},
  coords: { type: [Number], index: '2dsphere', required: true },
  openingTimes: [openingTimeSchema],
  // uploadedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  reviews: [reviewSchema]
}, {timestamps: true});

LocationSchema.plugin(uniqueValidator, {errors: 'is already taken'});

LocationSchema.methods.updateFavoriteCount = function(){
  const location = this;

  return User
  .count({favorites: {$in: [location.id]}})
  .then(function(count){
    location.favoritesCount = count;

    return location.save();
  })
}

LocationSchema.methods.toJSONFor = function(user){
  return {
    slug: this.slug,
    name: this.name,
    address: this.address,
    ratings: this.ratings,
    facilities: this.facilities,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    favoritesCount: this.favoritesCount,
    favorited: user ? user.isFavorite(this._id) : false,
    uploadedBy: this.uploadedBy.toProfileJSONFor(user),
    coords: this.coords,
    openingTImes: this.openingTImes
  }
}

const Location = mongoose.model('location', LocationSchema);
module.exports = Location;