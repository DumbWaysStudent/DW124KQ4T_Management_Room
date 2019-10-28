import { AsyncStorage } from "react-native";
import axios from "../utils/Api";

import { loginStarted, loginSuccess, loginFailure, resetAuth } from "../_actions/auth"


class Auth {
    save = async (data) => {
        for(var key in data){
            await AsyncStorage.setItem(`authUser.${key}`, data[key] );
        }
    }

    fetch = async (key) => {
        let res="";
        await AsyncStorage.getItem(`authUser.${key}`).then((data)=> res = data);
        return res;
    }

    exist = async () => {
        if(await this.fetch("token")){
            return true;
        }
        else{
            return false;
        }
    }

    destroy = async () => {
        await AsyncStorage.removeItem(`authUser.id`);
        await AsyncStorage.removeItem(`authUser.image`);
        await AsyncStorage.removeItem(`authUser.name`);
        await AsyncStorage.removeItem(`authUser.token`);
    }

    update = async (data, key) => {
        await AsyncStorage.removeItem(`authUser.${key}`);
        await AsyncStorage.setItem(`authUser.${key}`, data);
    }

    login = (data) => {
        return dispatch => {
            dispatch(loginStarted());
            axios({
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                data: data,          
                url: `/login`
            }).then(result=>{
                dispatch(loginSuccess(result.data.data));
            }).catch(err=>{
                if(typeof err.response !== "undefined"){
                    dispatch(loginFailure(err.response));
                }
                else{
                    dispatch(loginFailure(err));
                }
            });
        }
    }

    resetAuth = ()=>{
        return dispatch=>{dispatch(resetAuth())};
    }
}


export default new Auth;