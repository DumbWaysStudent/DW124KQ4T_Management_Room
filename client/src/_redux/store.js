import { createStore, combineReducers, applyMiddleware } from 'redux';

import auth from '../_reducers/auth';
import thunk from 'redux-thunk';

// this global states
const reducers = combineReducers({
  auth,
});

export default createStore(reducers, applyMiddleware(thunk));