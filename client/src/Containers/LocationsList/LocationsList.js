import React, { Component } from 'react';

import LocationList from '../../Components/LocationList/LocationList';

class LocationsList extends Component {

  ratingStars = number => {
    return (
      <span>
        <small className={`glyphicon ${number < 1 ? `glyphicon-star-empty` : `glyphicon-star` }`}></small>
        <small className={`glyphicon ${number < 2 ? `glyphicon-star-empty` : `glyphicon-star` }`}></small>
        <small className={`glyphicon ${number < 3 ? `glyphicon-star-empty` : `glyphicon-star` }`}></small>
        <small className={`glyphicon ${number < 4 ? `glyphicon-star-empty` : `glyphicon-star` }`}></small>
        <small className={`glyphicon ${number < 5 ? `glyphicon-star-empty` : `glyphicon-star` }`}></small>
      </span>
    )
  }

  formatDistance = distance => {
    if(isNaN(distance)){
      return '?'
    }

    let num, unit;
    if(distance > 1){
      num = parseFloat(distance/1000).toFixed(1);
      unit = ' km';
    } else {
      num = parseFloat(distance, 10);
      unit = ' m';
    }

    return num + unit
  }
  
  render(){
    return (
      <LocationList formatDistance={this.formatDistance} ratingStars={this.ratingStars}/>
    )
  }
}

export default LocationsList;