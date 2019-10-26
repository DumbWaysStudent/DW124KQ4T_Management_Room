import { createStore, combineReducers, applyMiddleware } from 'redux';

import auth from '../_reducers/auth';
import getRoom from '../_reducers/getRoom';
import createRoom from '../_reducers/createRoom';
import updateRoom from '../_reducers/updateRoom';
import getCustomer from '../_reducers/getCustomer';
import createCustomer from '../_reducers/createCustomer';
import updateCustomer from '../_reducers/updateCustomer';
import getCheckin from '../_reducers/getCheckin';
import createCheckin from '../_reducers/createCheckin';
import thunk from 'redux-thunk';

// this global states
const reducers = combineReducers({
  auth,
  getRoom,
  createRoom,
  updateRoom,
  getCustomer,
  createCustomer,
  updateCustomer,
  getCheckin,
  createCheckin
});

export default createStore(reducers, applyMiddleware(thunk));