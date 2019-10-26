import { createStore, combineReducers, applyMiddleware } from 'redux';

import auth from '../_reducers/auth';
import getRoom from '../_reducers/getRoom';
import thunk from 'redux-thunk';

// this global states
const reducers = combineReducers({
  auth,
  getRoom
});

export default createStore(reducers, applyMiddleware(thunk));