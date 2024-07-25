import { DECREMENT, INCREMENT, SET_CANDIDATE, SET_CANDIDATE_EMAIL, SET_CURRENT_PAGE, SET_EXPIRED, SET_INEXPIRED, SET_INVALID, SET_INVERIFIED, SET_VALID, SET_VERIFIED } from "../../../common/constants/actionTypes";


const getInitialStateFromLocalStorage = () => {
    const savedState = localStorage.getItem('candidateState');

    if (savedState) {
        return JSON.parse(savedState);
    }

    return {
        candidate: {
            firstName: "",
            lastName: "",
            gender: "",
            email: "",
            date: "",
            numero: "",
            cin: "",
            adresse: ""
        },
        currentPage: 1,
        isValid : null,
        isExpired : null,
        isVerified : false,
    };
};

const initialState = getInitialStateFromLocalStorage();

const candidateReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_CANDIDATE_EMAIL:
            newState = { ...state, candidate: { ...state.candidate , email: action.payload } };
            break;
        case SET_CANDIDATE:
            newState = { ...state, candidate: action.payload };
            break;
        case SET_CURRENT_PAGE:
            newState = { ...state, currentPage: action.payload };
            break;
        case INCREMENT:
            newState = { ...state, currentPage: state.currentPage < action.payload ? state.currentPage + 1 : state.currentPage };
            break;
        case DECREMENT:
            newState = { ...state, currentPage: state.currentPage > 1 ? state.currentPage - 1 : state.currentPage };
            break;
        case SET_VALID:
            newState = { ...state, isValid: true };
            break;
        case SET_INVALID:
            newState = { ...state, isValid: false };
            break;
        case SET_EXPIRED:
            newState = { ...state, isExpired: true };
            break;
        case SET_INEXPIRED:
            newState = { ...state, isExpired: false };
            break;
        case SET_VERIFIED:
            newState = { ...state, isVerified: true };
            break;
        case SET_INVERIFIED:
            newState = { ...state, isVerified: false };
            break;
        default:
            newState = state;
    }

    localStorage.setItem('candidateState', JSON.stringify(newState));

    return newState;
};

export default candidateReducer;
