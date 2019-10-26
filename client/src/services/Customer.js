import axios from "../utils/Api";

import { getCustomerFullfilled, getCustomerPending, getCustomerRejected, resetGetCustomer, addCustomer, editCustomer } from "../_actions/getCustomer"

class Customer {
    index = (token) => {
        return dispatch => {
            console.log("--------------loading")
            dispatch(getCustomerPending());
            axios({
                method: 'GET',
                headers: { 'content-type': 'application/json', "authorization": `Bearer ${token}` },
                url: `/customers`
            }).then(result=>{
                console.log("--------------ntap")
                dispatch(getCustomerFullfilled(result.data.data));
            }).catch(err=>{
                console.log("--------------error")
                if(typeof err.response !== "undefined"){
                    dispatch(getCustomerRejected(err.response));
                }
                else{
                    dispatch(getCustomerRejected(err));
                }
            });
        }
    }
    addCustomer = (data) => {
        return dispatch=>{
            dispatch(addCustomer(data))
            dispatch(resetCreateCustomer());
        }
    }

    resetGetCustomer = ()=>{
        return dispatch=>{dispatch(resetGetCustomer())};
    }

    editCustomer = (data) => {
        return dispatch=>{
            dispatch(editCustomer(data))
            dispatch(resetUpdateCustomer());
        }
    }
}

export default new Customer;