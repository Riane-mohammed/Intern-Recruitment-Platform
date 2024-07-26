import { combineReducers } from "redux";

//Reducers
import userReducer from "../modules/admin/reducers/userReducer";
import candidateReducer from "../modules/quiz/reducers/candidateReducer";

const rootReducer = combineReducers({
    user: userReducer,
    candidate: candidateReducer
});

export default rootReducer;