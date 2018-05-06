import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import Location from '../../Components/Location/Location';

class Locations extends Component {
  componentDidMount(){
    this.props.loadLocation(this.props.match.params.id)
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

  render(){
    return(
      <Location location={this.props.location} ratingStars={this.ratingStars}/>
    )
  }
}

const mapStateToProps = state => {
  return {
    location: state.locations.location
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadLocation: (id) => dispatch(actions.fetchLocationById(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Locations)