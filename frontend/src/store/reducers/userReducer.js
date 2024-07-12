import { REMOVE_USER, SET_USER } from "../constants/actionTypes";

const initialState = {
    user : {},
};

const userReducer = (state = initialState, action) => {
switch (action.type) {
    case SET_USER:
        return { ...state, user: action.playload };
    case REMOVE_USER:
        return { ...state, user: {} };
    default:
        return state;
}
};

export default userReducer;