import * as actionTypes from "../actions/actionTypes";

const initialUserState = {
    currentUser: null,
    isLoading: true
}

const userReducer = (state = initialUserState,action:any) => {
    switch(action.type){
        case actionTypes.SET_USER:
            return {
                ...state,
                currentUser: action.payload.currentUser,
                isLoading: false
            }
        case actionTypes.CLEAR_USER:
            return {
                ...state,
                currentUser: null,
                isLoading: false
            }
        default:
            return state
    }
}

export default userReducer;