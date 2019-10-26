import { CREATE_CUSTOMER_FULLFILLED, CREATE_CUSTOMER_PENDING, CREATE_CUSTOMER_REJECTED, RESET_CREATE_CUSTOMER } from "../_types/createCustomer"

export const createCustomerPending = () => {
    return {
      type: CREATE_CUSTOMER_PENDING
    }
  }
  export const createCustomerFullfilled = (data) => {
    return {
      type: CREATE_CUSTOMER_FULLFILLED,
      payload: data
    }
  }
  export const createCustomerRejected = (data) => {
    return {
      type: CREATE_CUSTOMER_REJECTED,
      payload: data
    }
  }
  
  export const resetCreateCustomer = () => {
    return {
      type: RESET_CREATE_CUSTOMER
    }
  }
