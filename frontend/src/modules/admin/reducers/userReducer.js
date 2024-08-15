import { REMOVE_USER, SET_AUTHENTICATED, SET_USER } from "../../../common/constants/actionTypes";

const getInitialStateFromLocalStorage = () => {
    const savedState = localStorage.getItem('userState');

    if (savedState) {
        return JSON.parse(savedState);
    }

    return {
        user: null,
        isAuthenticated : false,
    };
};

const initialState = getInitialStateFromLocalStorage();

const userReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case SET_USER:
            newState = { ...state, user: action.payload };
            break;
        case REMOVE_USER:
            newState = { ...state, user: null };
            break;
        case SET_AUTHENTICATED:
            newState = { ...state, isAuthenticated: action.payload };
            break;
        default:
            newState = state;
    };
    
    localStorage.setItem('userState', JSON.stringify(newState));

    return newState;
};

export default userReducer;