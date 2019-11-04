import { GET_CUSTOMER_PENDING, GET_CUSTOMER_FULLFILLED, GET_CUSTOMER_REJECTED, RESET_GET_CUSTOMER, ADD_CUSTOMER, EDIT_CUSTOMER } from "../_types/getCustomer"

const initialState = {
    isLoading: false,
    data: [],
    error: null
}

const getCustomer = (state = initialState, action) => {
    switch (action.type) {
      case GET_CUSTOMER_PENDING:
        return {
          ...state,
          isLoading: true,
          data:[],
          error: null
        } 
      
      case GET_CUSTOMER_FULLFILLED:
        return {
          ...state,
          isLoading: false,
          data:action.payload,
          error: null
        } 
      
      case GET_CUSTOMER_REJECTED:
        return {
          ...state,
          isLoading: false,
          data: [],
          error: action.payload
        } 
      case RESET_GET_CUSTOMER:
          return {
            ...state,
            isLoading: false,
            data: [],
            error: null
          } 
      case ADD_CUSTOMER:
          let data =state.data.filter((item)=>item.id!==0)
          data.unshift(action.payload);
          return {
            ...state,
            isLoading: false,
            data: data,
            error: null
          }
    case EDIT_CUSTOMER:
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
  
  export default getCustomer;