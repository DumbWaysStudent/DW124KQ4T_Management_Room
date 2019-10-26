import axios from "../utils/Api";

import { getRoomFullfilled, getRoomPending, getRoomRejected, resetGetRoom } from "../_actions/getRoom"


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

    resetGetRoom = ()=>{
        return dispatch=>{dispatch(resetGetRoom())};
    }
}

export default new Room;