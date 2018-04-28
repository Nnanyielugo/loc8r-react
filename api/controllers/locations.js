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
  let maxDistance = parseFloat(req.query.maxDistance);

  let point = {
    type: "Point",
    coordinates: [longitude, latitude]
  }

  let geoOptions = {
    spherical: true,
    maxDistance: earth.getRadiansFromDistance(maxDistance),
    num: 10
  }

  if((!longititude && longitude === 0) || (!latitude && latitude === 0)){
    console.log('LocationListByDistance missing params');
    return res.status(401).json({message: "longitude and latitude query parameters are required"})
  }

  Locations.geoNear(point, geoOptions, (err, results, stats)=> {
    let locations = [];
    if(err) return next(err)
    results.forEach(result => {
      locations.push({
        distance: result.dis,
        name: result.obj.name,
        address: result.obj.address,
        rating: result.obj.rating,
        facilities: result.obj.facilities,
        id: result.obj._id
      })
    })
    res.status(200).send(locations)
  })
}