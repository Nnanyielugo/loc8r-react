import * as types from '../actions/types';

const initialState = {
  locations: [],
  location: {}
};

const reducer = (state = initialState, action) => {
  switch(action.type){
    case types.LIST_LOCATIONS_BY_DISTANCE:
      return {
        ...state,
        locations: action.locations
      }
    case types.LOAD_LOCATION_BY_ID:
      return {
        ...state,
        location: action.location
      }
    default:
      return state;
  }
}

export default reducer;