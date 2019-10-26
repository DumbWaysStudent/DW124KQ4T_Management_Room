import axios from "../utils/Api";

import { getRoomFullfilled, getRoomPending, getRoomRejected, resetGetRoom, addRoom } from "../_actions/getRoom"

import { createRoomPending, createRoomFullfilled, createRoomRejected, resetCreateRoom } from "../_actions/createRoom"

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
}

export default new Room;