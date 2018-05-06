import * as types from '../actions/types';

const initialState = {
  locations: []
};

const reducer = (state = initialState, action) => {
  switch(action.type){
    case types.LIST_LOCATIONS_BY_DISTANCE:
      return {
        ...state,
        locations: action.locations
      }
    default:
      return state;
  }
}

export default reducer;