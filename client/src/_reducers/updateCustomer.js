import { UPDATE_CUSTOMER_FULLFILLED, UPDATE_CUSTOMER_PENDING, UPDATE_CUSTOMER_REJECTED, RESET_UPDATE_CUSTOMER } from "../_types/updateCustomer"

const initialState = {
    isLoading: false,
    data: null,
    error: null
}

const updateCustomer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_CUSTOMER_PENDING:
        return {
          ...state,
          isLoading: true,
          data:null,
          error: null
        } 
      
      case UPDATE_CUSTOMER_FULLFILLED:
        return {
          ...state,
          isLoading: false,
          data:action.payload,
          error: null
        } 
      
      case UPDATE_CUSTOMER_REJECTED:
        return {
          ...state,
          isLoading: false,
          data: null,
          error: action.payload
        } 
      case RESET_UPDATE_CUSTOMER:
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
  
  export default updateCustomer;