import { SAVE_AUTH, SAVE_AUTH_PENDING, LOGIN_AUTH_STARTED, LOGIN_AUTH_SUCCESS, LOGIN_AUTH_FAILURE, RESET_AUTH } from "../_types/auth"


export const saveAuth = (data) => {
    return {
      type: SAVE_AUTH,
      payload: data
    }
  }
  
export const saveAuthPending = () => {
  return {
    type: SAVE_AUTH_PENDING
  }
}

export const loginStarted = () => {
  return {
    type: LOGIN_AUTH_STARTED
  }
}
export const loginSuccess = (data) => {
  return {
    type: LOGIN_AUTH_SUCCESS,
    payload: data
  }
}
export const loginFailure = (data) => {
  return {
    type: LOGIN_AUTH_FAILURE,
    payload: data
  }
}

export const resetAuth = () => {
  return {
    type: RESET_AUTH
  }
}