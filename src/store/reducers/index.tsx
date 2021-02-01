import { combineReducers } from "redux";
import userReducer from './user_reducer';
import channelReducer from './channel_reducer';


const rootReducer = combineReducers({
    user: userReducer,
    channel:channelReducer
});

export default rootReducer;