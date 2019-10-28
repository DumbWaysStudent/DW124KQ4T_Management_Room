import { CREATE_ROOM_FULLFILLED, CREATE_ROOM_PENDING, CREATE_ROOM_REJECTED, RESET_CREATE_ROOM } from "../_types/createRoom"

const initialState = {
    isLoading: false,
    data: null,
    error: null
}

const createRoom = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_ROOM_PENDING:
        return {
          ...state,
          isLoading: true,
          data:null,
          error: null
        } 
      
      case CREATE_ROOM_FULLFILLED:
        return {
          ...state,
          isLoading: false,
          data:action.payload,
          error: null
        } 
      
      case CREATE_ROOM_REJECTED:
        return {
          ...state,
          isLoading: false,
          data: null,
          error: action.payload
        } 
      case RESET_CREATE_ROOM:
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
  
  export default createRoom;