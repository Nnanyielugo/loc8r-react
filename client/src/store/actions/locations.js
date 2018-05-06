import axios from 'axios';
import * as types from './types';

const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5000/' : ''

const loadLocations = locations => {
  return {
    type: types.LIST_LOCATIONS_BY_DISTANCE,
    locations
  }
}

export const fetchLocationsByDistance = (longitude, latitude) => {
  return dispatch => {
    axios.get(`${baseUrl}api/locations/?longitude=${longitude}&latitude=${latitude}`)
      .then(response => {
        console.log(response.data)
        dispatch(loadLocations(response.data))
      })
      .catch(error => {
        console.log(error);
      });
  }
}