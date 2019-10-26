import axios from "../utils/Api";

import { getRoomFullfilled, getRoomPending, getRoomRejected, resetGetRoom, addRoom, editRoom } from "../_actions/getRoom"

import { createRoomPending, createRoomFullfilled, createRoomRejected, resetCreateRoom } from "../_actions/createRoom"

import { updateRoomPending, updateRoomFullfilled, updateRoomRejected, resetUpdateRoom } from "../_actions/updateRoom"

class Room {
    index = (token) => {
        return dispatch => {
            console.log("--------------loading")
            dispatch(getRoomPending());
            axios({
                method: 'GET',
                headers: { 'content-type': 'application/json', "authorization": `Bearer ${token}` },
                url: `/rooms`
            }).then(result=>{
                console.log("--------------ntap")
                dispatch(getRoomFullfilled(result.data.data));
            }).catch(err=>{
                console.log("--------------error")
                if(typeof err.response !== "undefined"){
                    dispatch(getRoomRejected(err.response));
                }
                else{
                    dispatch(getRoomRejected(err));
                }
            });
        }
    }

    store = (token,data) => {
        return dispatch => {
            console.log("--------------loading")
            dispatch(createRoomPending());
            axios({
                method: 'POST',
                headers: { 'content-type': 'application/json', "authorization": `Bearer ${token}` },
                data: data,
                url: `/room`
            }).then(result=>{
                console.log("--------------ntap")
                dispatch(createRoomFullfilled(result.data.data));
            }).catch(err=>{
                console.log("--------------error")
                if(typeof err.response !== "undefined"){
                    dispatch(createRoomRejected(err.response));
                }
                else{
                    dispatch(createRoomRejected(err));
                }
            });
        }
    }

    addRoom = (data) => {
        return dispatch=>{
            dispatch(addRoom(data))
            dispatch(resetCreateRoom());
        }
    }

    resetGetRoom = ()=>{
        return dispatch=>{dispatch(resetGetRoom())};
    }


    update = (token,data,id) => {
        return dispatch => {
            console.log("--------------loading")
            dispatch(updateRoomPending());
            axios({
                method: 'PUT',
                headers: { 'content-type': 'application/json', "authorization": `Bearer ${token}` },
                data: data,
                url: `/room/${id}`
            }).then(result=>{
                console.log("--------------ntap")
                dispatch(updateRoomFullfilled(result.data.data));
            }).catch(err=>{
                console.log("--------------error")
                if(typeof err.response !== "undefined"){
                    dispatch(updateRoomRejected(err.response));
                }
                else{
                    dispatch(updateRoomRejected(err));
                }
            });
        }
    }

    editRoom = (data) => {
        return dispatch=>{
            dispatch(editRoom(data))
            dispatch(resetUpdateRoom());
        }
    }
}

export default new Room;