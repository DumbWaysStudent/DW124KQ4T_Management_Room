import axios from "../utils/Api";

import { getCheckinFullfilled, getCheckinPending, getCheckinRejected, resetGetCheckin, addCheckin, editCheckin } from "../_actions/getCheckin"

import { createCheckinPending, createCheckinFullfilled, createCheckinRejected, resetCreateCheckin } from "../_actions/createCheckin"

class Checkin {
    index = (token) => {
        return dispatch => {
            console.log("--------------loading")
            dispatch(getCheckinPending());
            axios({
                method: 'GET',
                headers: { 'content-type': 'application/json', "authorization": `Bearer ${token}` },
                url: `/checkin`
            }).then(result=>{
                console.log("--------------ntap")
                dispatch(getCheckinFullfilled(result.data.data));
            }).catch(err=>{
                console.log("--------------error")
                if(typeof err.response !== "undefined"){
                    dispatch(getCheckinRejected(err.response));
                }
                else{
                    dispatch(getCheckinRejected(err));
                }
            });
        }
    }
    store = (token, data)=>{
        return dispatch => {
            console.log("--------------loading")
            dispatch(createCheckinPending());
            axios({
                method: 'POST',
                headers: { 'content-type': 'application/json', "authorization": `Bearer ${token}` },
                url: `/checkin`,
                data: data
            }).then(result=>{
                console.log("--------------ntap")
                dispatch(createCheckinFullfilled(result.data.data));
            }).catch(err=>{
                console.log("--------------error")
                if(typeof err.response !== "undefined"){
                    dispatch(createCheckinRejected(err.response));
                }
                else{
                    dispatch(createCheckinRejected(err));
                }
            });
        }
    }
    addCheckin = (data) => {
        return dispatch=>{
            dispatch(addCheckin(data))
            dispatch(resetCreateCheckin());
        }
    }
    resetCreateCheckin = () => {
        return dispatch=>{
            dispatch(resetCreateCheckin());
        }
    }

    resetGetCheckin = ()=>{
        return dispatch=>{dispatch(resetGetCheckin())};
    }

    editCheckin = (data) => {
        return dispatch=>{
            dispatch(editCheckin(data))
            dispatch(resetCreateCheckin());
            // dispatch(resetUpdateCheckin());
        }
    }
}

export default new Checkin;