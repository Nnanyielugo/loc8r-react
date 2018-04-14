const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  review: { type: String, required: true }
}, {timestamps: true});

ReviewSchema.methods.toJSONFor = function(user){
  return {
    id: this.id,
    review: this.review,
    rating: this.rating,
    createdAt: this.createdAt,
    author: this.author.toProfileJSONFor(user)
  }
}

const Review = mongoose.model('review', ReviewSchema);
module.exports = Review;