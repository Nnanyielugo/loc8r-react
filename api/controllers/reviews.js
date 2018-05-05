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

        updateAverateRating(location._id)
        thisReview = location.reviews[location.reviews.length -1];

        return res.status(200).json(thisReview)
      })
      .catch(next)
    })
    .catch(next)
}

const updateAverateRating = (id) => {
  Locations
    .findById(id)
    .select('rating reviews')
    .exec()
    .then(location => {
      let i, reviewCount, ratingAverage, ratingTotal;
      if(location.reviews && location.reviews.length > 1){
        reviewCount = location.reviews.length;
        ratingTotal = 0;
        for(i = 0; i < reviewCount; i++){
          ratingTotal = ratingTotal + location.reviews[i].rating;
        }
        ratingAverage = parseInt(ratingTotal/reviewCount, 10)
        location.rating = ratingAverage;
        
        return location.save().then(() => console.log('reviews updated to', ratingAverage))
      }
    })
    .catch((err) => {
      console.log('There was an error', err)
    })
}