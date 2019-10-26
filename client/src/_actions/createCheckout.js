import { CREATE_CHECKOUT_FULLFILLED, CREATE_CHECKOUT_PENDING, CREATE_CHECKOUT_REJECTED, RESET_CREATE_CHECKOUT } from "../_types/createCheckout"

export const createCheckoutPending = () => {
    return {
      type: CREATE_CHECKOUT_PENDING
    }
  }
  export const createCheckoutFullfilled = (data) => {
    return {
      type: CREATE_CHECKOUT_FULLFILLED,
      payload: data
    }
  }
  export const createCheckoutRejected = (data) => {
    return {
      type: CREATE_CHECKOUT_REJECTED,
      payload: data
    }
  }
  
  export const resetCreateCheckout = () => {
    return {
      type: RESET_CREATE_CHECKOUT
    }
  }
