import { GET_CHECKIN_PENDING, GET_CHECKIN_FULLFILLED, GET_CHECKIN_REJECTED, RESET_GET_CHECKIN, ADD_CHECKIN, EDIT_CHECKIN } from "../_types/getCheckin"

const initialState = {
    isLoading: false,
    data: [],
    error: null
}

const getCheckin = (state = initialState, action) => {
    switch (action.type) {
      case GET_CHECKIN_PENDING:
        return {
          ...state,
          isLoading: true,
          data:null,
          error: null
        } 
      
      case GET_CHECKIN_FULLFILLED:
        return {
          ...state,
          isLoading: false,
          data:action.payload,
          error: null
        } 
      
      case GET_CHECKIN_REJECTED:
        return {
          ...state,
          isLoading: false,
          data: null,
          error: action.payload
        } 
      case RESET_GET_CHECKIN:
          return {
            ...state,
            isLoading: false,
            data: [],
            error: null
          } 
      case ADD_CHECKIN:
          let data =state.data.filter((item)=>item.id!==0)
          data.push(action.payload);
          return {
            ...state,
            isLoading: false,
            data: data,
            error: null
          }
    case EDIT_CHECKIN:
        let index = state.data.findIndex(item => item.id === action.payload.id);
        state.data[index] = action.payload;
        return {
            ...state,
            isLoading: false,
            data: state.data,
            error: null
        }
      default:
        return state;
    }
  }
  
  export default getCheckin;