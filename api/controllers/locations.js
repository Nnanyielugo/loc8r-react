const Locations = require('mongoose').model('location');
// const Review = require('mongoose').model('review')

const earth = (function(){
  let radius = 6371; // kms

  let getDistanceFromRadians = radians => {
    return parseFloat(radians * radius)
  }

  let getRadiansFromDistance = distance => {
    return parseFloat(distance / radius)
  }

  return {
    getDistanceFromRadians,
    getRadiansFromDistance
  }
})();

// module.exports.preloadPostId = (req, res, next, id) => {
//   Locations.findById(id)
//     // .populate('author')
//     .then(location => {
//       if(!location) {return res.status(404).json({errors: {error: "Location does not exist!"}});}
//       // return res.status(200).json({Post: post})
//       req.location = location;
//       return next()
//     })
//     .catch(next)
// }
// module.exports.preloadCommentId = (req, res, next, id) => {
//   Review.findById(id).then(function(review){
//     if(!review) { return res.status(404).json({errors: {error: "Comment does not exist"}}) ; }

//     req.review = review;
//     return next();
//   }).catch(next);
// }

module.exports.listLocationsByDistance = (req, res, next) => {
  let longitude = parseFloat(req.query.longitude);
  let latitude = parseFloat(req.query.latitude);
  // let maxDistance = parseFloat(req.query.maxDistance);

  let point = {
    type: "Point",
    coordinates: [longitude, latitude]
  }


  if((!longitude && longitude === 0) || (!latitude && latitude === 0)){
    console.log('LocationListByDistance missing params');
    return res.status(401).json({message: "longitude and latitude query parameters are required"})
  }

  Locations.aggregate([
      {
        '$geoNear': {
          'near': point,
          'spherical': true,
          'distanceField': 'dist',
          'num': 10,
          'maxDistance': earth.getRadiansFromDistance(20)
        }
      }
    ], (err, results, stats)=> {
      let locations = [];
      if(err) return next(err)
      results.forEach(result => {
        console.log(result)
        locations.push({
          distance: result.dis,
          name: result.name,
          address: result.address,
          rating: result.rating,
          facilities: result.facilities,
          id: result._id
        })
      })
      res.status(200).send(locations)
    });
}

module.exports.create = (req, res, next) => {
  const location = new Locations({
    name: req.body.name,
    address: req.body.address,
    facilities: req.body.facilities.split(","),
    coords: [parseFloat(req.body.longitude), parseFloat(req.body.latitude)],
    openingTimes: [{
      days:req.body.days1,
      opening: req.body.opening1,
      closing: req.body.closing1,
      closed: req.body.closed1,
    },{
      days: req.body.days2,
      opening: req.body.opening2,
      closing: req.body.closing2,
      closed: req.body.closed2,
    }]
  });

  console.log(req.body.days1, req.body.days2)

  // 3.601521 6.458985

  return location.save()
    .then(() => {
      console.log(location)
      return res.json({ location: location})
    })
    .catch(next);

}

module.exports.readSingle = (req,res, next) => {
  if(!req.params && !req.params.id){
    return res.status(404).json({message: "No location id in request"})
  }

  Locations
    .findById(req.params.id)
    .populate('review')
    .exec()
    .then(location => {
      if(!location){
        return res.status(404).json({message: "locationId not found"})
      }
      return res.status(200).json(location)
    })
    .catch(next)
}

module.exports.update = (req, res, next) => {
  if(!req.params.id){
    return res.status(400).send({message: "locationid required"})
  }

  Locations
    .findByIdAndUpdate(req.params.id, req.body, {new: true})
    .select('-reviews -rating')
    .exec()
    .then(location => {
      if(!location){
        return res.status(404).json({message: "locationId not found"})
      }

      res.status(200).json(location)

    })
    .catch(next)
}

module.exports.delete = (req, res, next) => {
  if(!req.params.id){
    return res.status(404).json({message: 'location is required'})
  }

  Locations
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(location => {
      if(!location){
        return res.status(404).json({message: "locationId not found"})
      }

      return res.json({message: 'removed'})
    })
    .catch(next)
}


// module.exports.review_create = (req, res, next) => {
//   const review = new Review({
//     review: req.body.review,
//     author: req.body.author,
//     location: req.location,
//     rating: req.body.rating
//   });

//   return review.save()
//     .then(() => {
//       req.location.reviews.push(review)
//       // console.log(review)
//       return req.location.save().then(() => {
//         res.json(review)
//       })
//     })
//     .catch(next)
// }