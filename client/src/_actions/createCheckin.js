import { CREATE_CHECKIN_FULLFILLED, CREATE_CHECKIN_PENDING, CREATE_CHECKIN_REJECTED, RESET_CREATE_CHECKIN } from "../_types/createCheckin"

export const createCheckinPending = () => {
    return {
      type: CREATE_CHECKIN_PENDING
    }
  }
  export const createCheckinFullfilled = (data) => {
    return {
      type: CREATE_CHECKIN_FULLFILLED,
      payload: data
    }
  }
  export const createCheckinRejected = (data) => {
    return {
      type: CREATE_CHECKIN_REJECTED,
      payload: data
    }
  }
  
  export const resetCreateCheckin = () => {
    return {
      type: RESET_CREATE_CHECKIN
    }
  }
