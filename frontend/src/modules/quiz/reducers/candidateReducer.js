import { DECREMENT, INCREMENT, SET_CANDIDATE, SET_CANDIDATE_EMAIL, SET_CURRENT_PAGE, SET_DISQUALIFIED, SET_EXPIRED, SET_PREVIOUS_PATH, SET_VALID, SET_VERIFIED } from "../../../common/constants/actionTypes";


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
        previousPath:"",
        isValid : null,
        isExpired : null,
        isVerified: false,
        isDisqualified: false,
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
        case SET_PREVIOUS_PATH:
            newState = { ...state, previousPath: action.payload };
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
            newState = { ...state, isValid: action.payload };
            break;
        case SET_EXPIRED:
            newState = { ...state, isExpired: action.payload };
            break;
        case SET_VERIFIED:
            newState = { ...state, isVerified: action.payload };
            break;
        case SET_DISQUALIFIED:
            newState = { ...state, isDisqualified: action.payload };
            break;
        default:
            newState = state;
    }

    localStorage.setItem('candidateState', JSON.stringify(newState));

    return newState;
};

export default candidateReducer;
