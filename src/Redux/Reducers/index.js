import { combineReducers } from "redux";
import authReducer from './AuthReducers';
import userReducer from './UserReducers';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
});

export default rootReducer;