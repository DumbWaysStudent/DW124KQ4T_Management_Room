import { CREATE_CUSTOMER_FULLFILLED, CREATE_CUSTOMER_PENDING, CREATE_CUSTOMER_REJECTED, RESET_CREATE_CUSTOMER } from "../_types/createCustomer"

const initialState = {
    isLoading: false,
    data: null,
    error: null
}

const createCustomer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_CUSTOMER_PENDING:
        return {
          ...state,
          isLoading: true,
          data:null,
          error: null
        } 
      
      case CREATE_CUSTOMER_FULLFILLED:
        return {
          ...state,
          isLoading: false,
          data:action.payload,
          error: null
        } 
      
      case CREATE_CUSTOMER_REJECTED:
        return {
          ...state,
          isLoading: false,
          data: null,
          error: action.payload
        } 
      case RESET_CREATE_CUSTOMER:
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
  
  export default createCustomer;