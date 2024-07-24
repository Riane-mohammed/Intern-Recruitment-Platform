import { DECREMENT, INCREMENT, SET_CANDIDATE, SET_CANDIDATE_EMAIL, SET_CURRENT_PAGE, SET_EXPIRED, SET_INEXPIRED, SET_INVALID, SET_INVERIFIED, SET_VALID, SET_VERIFIED } from "../../../common/constants/actionTypes";

const initialState = {
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

const candidateReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CANDIDATE_EMAIL:
            return { ...state, candidate: { ...state.candidate , email: action.payload } };
        case SET_CANDIDATE:
            return { ...state, candidate: action.payload };
        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.payload };
        case INCREMENT:
            return { ...state, currentPage: state.currentPage < action.payload ? state.currentPage + 1 : state.currentPage };
        case DECREMENT:
            return { ...state, currentPage: state.currentPage > 1 ? state.currentPage - 1 : state.currentPage };
        case SET_VALID:
            return { ...state, isValid: true };
        case SET_INVALID:
            return { ...state, isValid: false };
        case SET_EXPIRED:
            return { ...state, isExpired: true };
        case SET_INEXPIRED:
            return { ...state, isExpired: false };
        case SET_VERIFIED:
            return { ...state, isVerified: true };
        case SET_INVERIFIED:
            return { ...state, isVerified: false };
        default:
            return state;
}
};

export default candidateReducer;