import axios from "../utils/Api";

import { getCustomerFullfilled, getCustomerPending, getCustomerRejected, resetGetCustomer, addCustomer, editCustomer } from "../_actions/getCustomer"

import { createCustomerPending, createCustomerFullfilled, createCustomerRejected, resetCreateCustomer } from "../_actions/createCustomer"

import { updateCustomerPending, updateCustomerFullfilled, updateCustomerRejected, resetUpdateCustomer } from "../_actions/updateCustomer"

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
    store = (token,data) => {
        return dispatch => {
            console.log("--------------loading")
            dispatch(createCustomerPending());
            axios({
                method: 'POST',
                headers: { 'content-type': 'application/json', "authorization": `Bearer ${token}` },
                data: data,
                url: `/customer`
            }).then(result=>{
                console.log("--------------ntap")
                dispatch(createCustomerFullfilled(result.data.data));
            }).catch(err=>{
                console.log("--------------error")
                if(typeof err.response !== "undefined"){
                    dispatch(createCustomerRejected(err.response));
                }
                else{
                    dispatch(createCustomerRejected(err));
                }
            });
        }
    }
    update = (token,data,id) => {
        return dispatch => {
            console.log("--------------loading")
            dispatch(updateCustomerPending());
            console.log(data);
            axios({
                method: 'PUT',
                headers: { 'content-type': 'application/json', "authorization": `Bearer ${token}` },
                data: data,
                url: `/customer/${id}`
            }).then(result=>{
                console.log("--------------ntap")
                dispatch(updateCustomerFullfilled(result.data.data));
            }).catch(err=>{
                console.log("--------------error")
                if(typeof err.response !== "undefined"){
                    dispatch(updateCustomerRejected(err.response));
                }
                else{
                    dispatch(updateCustomerRejected(err));
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

    resetCreateCustomer = () => {
        return dispatch=>{
            dispatch(resetCreateCustomer());
        }
    } 

    resetUpdateCustomer = () => {
        return dispatch=>{
            dispatch(resetUpdateCustomer());
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