import { GET_ROOM_PENDING, GET_ROOM_FULLFILLED, GET_ROOM_REJECTED, RESET_GET_ROOM, ADD_ROOM } from "../_types/getRoom"

const initialState = {
    isLoading: false,
    data: [{id:0,name:"+"}],
    error: null
}

const getRoom = (state = initialState, action) => {
    switch (action.type) {
      case GET_ROOM_PENDING:
        return {
          ...state,
          isLoading: true,
          data:null,
          error: null
        } 
      
      case GET_ROOM_FULLFILLED:
          action.payload.push({id:0,name:"+ Add Room"});
        return {
          ...state,
          isLoading: false,
          data:action.payload,
          error: null
        } 
      
      case GET_ROOM_REJECTED:
        return {
          ...state,
          isLoading: false,
          data: null,
          error: action.payload
        } 
      case RESET_GET_ROOM:
          return {
            ...state,
            isLoading: false,
            data: [],
            error: null
          } 
      case ADD_ROOM:
          let data =state.data.filter((item)=>item.id!==0)
          data.push(action.payload);
          data.push({id:0, name:"+"});
          return {
            ...state,
            isLoading: false,
            data: data,
            error: null
          }
      default:
        return state;
    }
  }
  
  export default getRoom;