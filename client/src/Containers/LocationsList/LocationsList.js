import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as types from '../../store/actions/index';
import LocationList from '../../Components/LocationList/LocationList';

class LocationsList extends Component {

  componentDidMount(){

    const getPosition = (position) => {
      console.log(position.coords)
      return this.props.getCoords(position.coords.longitude, position.coords.latitude)
    }

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(getPosition)
    }
  }

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
    let locations;
    if(this.props.locations){
      locations = this.props.locations.map(location => {
        return <LocationList key={location.id} location={location} formatDistance={this.formatDistance} ratingStars={this.ratingStars}/>
      })
    }
    
    return (
      <div className="container">
        <div className="banner"><big><b>Loc8r</b></big>&nbsp;Find places to work with wifi near you!</div>
        {locations}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    locations: state.locations.locations
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCoords: (longitude, latitude) => dispatch(types.fetchLocationsByDistance(longitude, latitude))
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (LocationsList);