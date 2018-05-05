const Locations = require('mongoose').model('location')

module.exports.create = (req, res, next) => {
  if(!req.params.id){
    return res.sendStatus(404)
  }

  Locations
    .findById(req.params.id)
    .select('reviews')
    .exec()
    .then(location => {
      location.reviews.push({
        author: req.body.author,
        rating: req.body.rating,
        review: req.body.review
      })

      return location.save().then(() => {
        let thisReview;

        // updateAverateRating(location._id)
        thisReview = location.reviews[location.reviews.length -1];

        return res.status(200).json(thisReview)
      })
      .catch(next)
    })
    .catch(next)
}