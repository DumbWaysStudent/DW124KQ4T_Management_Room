import { CREATE_ROOM_FULLFILLED, CREATE_ROOM_PENDING, CREATE_ROOM_REJECTED, RESET_CREATE_ROOM } from "../_types/createRoom"

export const createRoomPending = () => {
    return {
      type: CREATE_ROOM_PENDING
    }
  }
  export const createRoomFullfilled = (data) => {
    return {
      type: CREATE_ROOM_FULLFILLED,
      payload: data
    }
  }
  export const createRoomRejected = (data) => {
    return {
      type: CREATE_ROOM_REJECTED,
      payload: data
    }
  }
  
  export const resetCreateRoom = () => {
    return {
      type: RESET_CREATE_ROOM
    }
  }
