import { createStore, combineReducers, applyMiddleware } from 'redux';

import auth from '../_reducers/auth';
import getRoom from '../_reducers/getRoom';
import createRoom from '../_reducers/createRoom';
import thunk from 'redux-thunk';

// this global states
const reducers = combineReducers({
  auth,
  getRoom,
  createRoom
});

export default createStore(reducers, applyMiddleware(thunk));