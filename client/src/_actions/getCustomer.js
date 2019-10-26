import { GET_CUSTOMER_PENDING, GET_CUSTOMER_FULLFILLED, GET_CUSTOMER_REJECTED, RESET_GET_CUSTOMER, ADD_CUSTOMER, EDIT_CUSTOMER } from "../_types/getCustomer"

export const getCustomerPending = () => {
    return {
      type: GET_CUSTOMER_PENDING
    }
  }
  export const getCustomerFullfilled = (data) => {
    return {
      type: GET_CUSTOMER_FULLFILLED,
      payload: data
    }
  }
  export const getCustomerRejected = (data) => {
    return {
      type: GET_CUSTOMER_REJECTED,
      payload: data
    }
  }
  
  export const resetGetCustomer = () => {
    return {
      type: RESET_GET_CUSTOMER
    }
  }

  export const addCustomer = (data) => {
    return {
      type: ADD_CUSTOMER,
      payload: data
    }
  }

  export const editCustomer = (data) => {
    return {
      type: EDIT_CUSTOMER,
      payload: data
    }
  }