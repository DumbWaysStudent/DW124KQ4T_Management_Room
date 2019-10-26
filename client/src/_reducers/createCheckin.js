import { CREATE_CHECKIN_FULLFILLED, CREATE_CHECKIN_PENDING, CREATE_CHECKIN_REJECTED, RESET_CREATE_CHECKIN } from "../_types/createCheckin"

const initialState = {
    isLoading: false,
    data: null,
    error: null
}

const createCheckin = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_CHECKIN_PENDING:
        return {
          ...state,
          isLoading: true,
          data:null,
          error: null
        } 
      
      case CREATE_CHECKIN_FULLFILLED:
        return {
          ...state,
          isLoading: false,
          data:action.payload,
          error: null
        } 
      
      case CREATE_CHECKIN_REJECTED:
        return {
          ...state,
          isLoading: false,
          data: null,
          error: action.payload
        } 
      case RESET_CREATE_CHECKIN:
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
  
  export default createCheckin;