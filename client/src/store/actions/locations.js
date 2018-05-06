import axios from 'axios';
import * as types from './types';

const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5000/api' : ''

const loadLocations = locations => {
  return {
    type: types.LIST_LOCATIONS_BY_DISTANCE,
    locations
  }
}

const loadLocation = location => {
  return {
    type: types.LOAD_LOCATION_BY_ID,
    location
  }
}

export const fetchLocationsByDistance = (longitude, latitude) => {
  return dispatch => {
    axios.get(`${baseUrl}/locations/?longitude=${longitude}&latitude=${latitude}`)
      .then(response => {
        console.log(response.data)
        dispatch(loadLocations(response.data))
      })
      .catch(error => {
        console.log(error);
      });
  }
}

export const fetchLocationById = (id) => {
  return dispatch => {
    axios.get(`${baseUrl}/locations/${id}`)
    .then(response => {
      console.log(response.data)
      dispatch(loadLocation(response.data))
    })
    .catch(error => {
      console.log(error)
    })
  }
}