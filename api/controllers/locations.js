const Locations = require('mongoose').model('location');

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
})()

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

module.exports.createLocation = (req, res, next) => {
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

  // 3.601521 6.458985

  return location.save()
    .then(() => {
      console.log(location)
      return res.json({ location: location})
    })
    .catch(next);

}