import { createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunk from 'redux-thunk';

import locations from './reducers/locations';

const configureStore = () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const appReducer = combineReducers({
    locations
  })

  const rootReducer = (state, action) => {
    // if (action.type === 'AUTH_LOGOUT'){
    //   state = undefined
    // }

    return appReducer(state, action)
  }

  const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

  return store;
}

export default configureStore;