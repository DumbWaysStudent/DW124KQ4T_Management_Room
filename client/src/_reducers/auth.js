import { SAVE_AUTH, SAVE_AUTH_PENDING, LOGIN_AUTH_STARTED, LOGIN_AUTH_SUCCESS, LOGIN_AUTH_FAILURE, RESET_AUTH } from "../_types/auth";

const initialState = {
    isLoading: false,
    data: null,
    error: null
}

const auth = (state = initialState, action) => {
    switch (action.type) {
      case SAVE_AUTH:
        return {
          ...state,
          data: action.payload,
          isLoading: false
        }
      case SAVE_AUTH_PENDING:
        return {
          ...state,
          isLoading: true
        } 
      case LOGIN_AUTH_STARTED:
        return {
          ...state,
          isLoading: true,
          data:null,
          error: null
        } 
      
      case LOGIN_AUTH_SUCCESS:
        return {
          ...state,
          isLoading: false,
          data:action.payload,
          error: null
        } 
      
      case LOGIN_AUTH_FAILURE:
        return {
          ...state,
          isLoading: false,
          data: null,
          error: action.payload
        } 
      case RESET_AUTH:
          return {
            ...state,
            isLoading: false,
            data: null,
            error: null
          } 
      default:
        return state;
    }
  }
  
  export default auth;