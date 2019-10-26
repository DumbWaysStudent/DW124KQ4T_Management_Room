import { UPDATE_ROOM_FULLFILLED, UPDATE_ROOM_PENDING, UPDATE_ROOM_REJECTED, RESET_UPDATE_ROOM } from "../_types/updateRoom"

export const updateRoomPending = () => {
    return {
      type: UPDATE_ROOM_PENDING
    }
  }
  export const updateRoomFullfilled = (data) => {
    return {
      type: UPDATE_ROOM_FULLFILLED,
      payload: data
    }
  }
  export const updateRoomRejected = (data) => {
    return {
      type: UPDATE_ROOM_REJECTED,
      payload: data
    }
  }
  
  export const resetUpdateRoom = () => {
    return {
      type: RESET_UPDATE_ROOM
    }
  }
