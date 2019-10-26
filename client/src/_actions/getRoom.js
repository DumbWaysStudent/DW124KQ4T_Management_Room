import { GET_ROOM_PENDING, GET_ROOM_FULLFILLED, GET_ROOM_REJECTED, RESET_GET_ROOM, ADD_ROOM, EDIT_ROOM } from "../_types/getRoom"

export const getRoomPending = () => {
    return {
      type: GET_ROOM_PENDING
    }
  }
  export const getRoomFullfilled = (data) => {
    return {
      type: GET_ROOM_FULLFILLED,
      payload: data
    }
  }
  export const getRoomRejected = (data) => {
    return {
      type: GET_ROOM_REJECTED,
      payload: data
    }
  }
  
  export const resetGetRoom = () => {
    return {
      type: RESET_GET_ROOM
    }
  }

  export const addRoom = (data) => {
    return {
      type: ADD_ROOM,
      payload: data
    }
  }

  export const editRoom = (data) => {
    return {
      type: EDIT_ROOM,
      payload: data
    }
  }