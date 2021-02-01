import * as actionType from "./actionTypes";

export const setCurrentChannel = (channel:any ) => {
    return {
        type: actionType.SET_CURRENT_CHANNEL,
        payload:{
            currentChannel: channel
        }
    }
}

export const setPrivateChannel = (isPrivateChannel:boolean) => {
    return {
        type: actionType.SET_PRIVATE_CHANNEL,
        payload:{
            isPrivateChannel
        }
    }
}
