import * as actionTypes from "../actions/actionTypes";

const initialChannelState = {
    currentChannel: null,
    isChannelLoading: true,
    isPrivateChannel: false
}

const channelReducer = (state = initialChannelState, action:any) => {
    switch(action.type){
        case actionTypes.SET_CURRENT_CHANNEL:
            return{
                ...state,
                currentChannel: action.payload.currentChannel,
                isChannelLoading: false
            }
        case actionTypes.SET_PRIVATE_CHANNEL:
            return{
                ...state,
                isPrivateChannel:action.payload.isPrivateChannel
            }
        default:
            return state;
    }
}


export default channelReducer;