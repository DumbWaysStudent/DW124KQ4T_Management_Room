import { CREATE_CHECKOUT_FULLFILLED, CREATE_CHECKOUT_PENDING, CREATE_CHECKOUT_REJECTED, RESET_CREATE_CHECKOUT } from "../_types/createCheckout"

const initialState = {
    isLoading: false,
    data: null,
    error: null
}

const createCheckout = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_CHECKOUT_PENDING:
        return {
          ...state,
          isLoading: true,
          data:null,
          error: null
        } 
      
      case CREATE_CHECKOUT_FULLFILLED:
        return {
          ...state,
          isLoading: false,
          data:action.payload,
          error: null
        } 
      
      case CREATE_CHECKOUT_REJECTED:
        return {
          ...state,
          isLoading: false,
          data: null,
          error: action.payload
        } 
      case RESET_CREATE_CHECKOUT:
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
  
  export default createCheckout;