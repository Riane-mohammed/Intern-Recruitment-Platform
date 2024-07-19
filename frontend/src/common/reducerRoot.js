import { combineReducers } from "redux";
import userReducer from "../modules/admin/reducers/userReducer";

const rootReducer = combineReducers({
    user : userReducer,
});

export default rootReducer;