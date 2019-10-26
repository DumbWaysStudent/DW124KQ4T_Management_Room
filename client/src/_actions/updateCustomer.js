import { UPDATE_CUSTOMER_FULLFILLED, UPDATE_CUSTOMER_PENDING, UPDATE_CUSTOMER_REJECTED, RESET_UPDATE_CUSTOMER } from "../_types/updateCustomer"

export const updateCustomerPending = () => {
    return {
      type: UPDATE_CUSTOMER_PENDING
    }
  }
  export const updateCustomerFullfilled = (data) => {
    return {
      type: UPDATE_CUSTOMER_FULLFILLED,
      payload: data
    }
  }
  export const updateCustomerRejected = (data) => {
    return {
      type: UPDATE_CUSTOMER_REJECTED,
      payload: data
    }
  }
  
  export const resetUpdateCustomer = () => {
    return {
      type: RESET_UPDATE_CUSTOMER
    }
  }
