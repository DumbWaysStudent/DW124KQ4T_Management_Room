import { UPDATE_ROOM_FULLFILLED, UPDATE_ROOM_PENDING, UPDATE_ROOM_REJECTED, RESET_UPDATE_ROOM } from "../_types/updateRoom"

const initialState = {
    isLoading: false,
    data: null,
    error: null
}

const updateRoom = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_ROOM_PENDING:
        return {
          ...state,
          isLoading: true,
          data:null,
          error: null
        } 
      
      case UPDATE_ROOM_FULLFILLED:
        return {
          ...state,
          isLoading: false,
          data:action.payload,
          error: null
        } 
      
      case UPDATE_ROOM_REJECTED:
        return {
          ...state,
          isLoading: false,
          data: null,
          error: action.payload
        } 
      case RESET_UPDATE_ROOM:
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
  
  export default updateRoom;