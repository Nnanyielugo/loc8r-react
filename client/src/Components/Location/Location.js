import React from 'react';

const location = props => {

  const openingTimes = props.location.openingTimes && props.location.openingTimes.map(time => (
    <div key={time._id}>
      <p>{time.days}: <span>{time.opening} - {time.closing}</span></p>

    </div>
  ));

  const label = props.location.facilities && props.location.facilities.map((facility, i) => (
    <span>
      <span key={i++} className="label label-warning"><span className="glyphicon glyphicon-ok"></span>{facility}</span>
      <span>&nbsp;</span>
    </span>
  ))

  
  return (
    <div className="container-fluid">
      <div className="row">
      <h1>{props.location.name}</h1>
        <div className="col-xs-12 col-md-9">
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-6">
              <p>{props.ratingStars(props.location.rating)}</p>
              <p>{props.location.address}</p>
              <div class="panel panel-primary">
                <div class="panel-heading">
                  <h2 class="panel-title">Opening hours</h2>
                </div>
                <div class="panel-body">
                  {openingTimes}
                </div>
              </div>
              <div class="panel panel-primary">
                <div class="panel-heading">
                  <h2 class="panel-title">Facilities</h2>
                </div>
                <div class="panel-body">
                  {label}
                </div>
              </div>
            </div>
            <div class="col-xs-12 col-sm-6 location-map">
          <div class="panel panel-primary">
            <div class="panel-heading">
              <h2 class="panel-title">Location map</h2>
            </div>
            <div class="panel-body">
              <img src={`http://maps.googleapis.com/maps/api/staticmap?center=${ props.location.coords && props.location.coords[1] },${ props.location.coords && props.location.coords[0] }&zoom=17&size=400x350&sensor=false&markers=${ props.location.coords && props.location.coords[1] },${ props.location.coords && props.location.coords[0] }&scale=2&key=AIzaSyB0OAqbWNI3-NfDgXTmC-aT39HxlfBxt2Q`} className="img-responsive img-rounded" />
            </div>
          </div>
        </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default location;