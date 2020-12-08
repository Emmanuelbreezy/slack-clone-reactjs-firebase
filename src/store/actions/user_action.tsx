import * as actionType from "./actionTypes";

export const setUser = (user:any ) => {
    return {
        type: actionType.SET_USER,
        payload:{
            currentUer: user
        }
    }
}

