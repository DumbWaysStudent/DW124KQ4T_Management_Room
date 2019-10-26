import axios from "../utils/Api";
import { editCheckin } from "../_actions/getCheckin"

import { createCheckoutPending, createCheckoutFullfilled, createCheckoutRejected, resetCreateCheckout } from "../_actions/createCheckout"

class Checkout {
    store = (token, data, id)=>{
        return dispatch => {
            console.log("--------------loading")
            dispatch(createCheckoutPending());
            axios({
                method: 'PUT',
                headers: { 'content-type': 'application/json', "authorization": `Bearer ${token}` },
                url: `/order/${id}`,
                data: data
            }).then(result=>{
                console.log("--------------ntap")
                dispatch(createCheckoutFullfilled(result.data.data));
            }).catch(err=>{
                console.log("--------------error")
                if(typeof err.response !== "undefined"){
                    dispatch(createCheckoutRejected(err.response));
                }
                else{
                    dispatch(createCheckoutRejected(err));
                }
            });
        }
    }
    addCheckout = (data) => {
        return dispatch=>{
            dispatch(addCheckout(data))
            dispatch(resetCreateCheckout());
        }
    }

    resetGetCheckout = ()=>{
        return dispatch=>{dispatch(resetGetCheckout())};
    }

    editCheckout = (data) => {
        return dispatch=>{
            dispatch(editCheckin(data))
            dispatch(resetCreateCheckout());
            // dispatch(resetUpdateCheckout());
        }
    }
}

export default new Checkout;