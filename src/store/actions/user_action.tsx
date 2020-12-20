import * as actionType from "./actionTypes";

export const setUser = (user:any ) => {
    return {
        type: actionType.SET_USER,
        payload:{
            currentUser: user
        }
    }
}

export const clearUser = () => {
    return {
        type: actionType.CLEAR_USER
    }
}
