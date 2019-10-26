import { GET_CHECKIN_PENDING, GET_CHECKIN_FULLFILLED, GET_CHECKIN_REJECTED, RESET_GET_CHECKIN, ADD_CHECKIN, EDIT_CHECKIN } from "../_types/getCheckin"

export const getCheckinPending = () => {
    return {
      type: GET_CHECKIN_PENDING
    }
  }
  export const getCheckinFullfilled = (data) => {
    return {
      type: GET_CHECKIN_FULLFILLED,
      payload: data
    }
  }
  export const getCheckinRejected = (data) => {
    return {
      type: GET_CHECKIN_REJECTED,
      payload: data
    }
  }
  
  export const resetGetCheckin = () => {
    return {
      type: RESET_GET_CHECKIN
    }
  }

  export const addCheckin = (data) => {
    return {
      type: ADD_CHECKIN,
      payload: data
    }
  }

  export const editCheckin = (data) => {
    return {
      type: EDIT_CHECKIN,
      payload: data
    }
  }