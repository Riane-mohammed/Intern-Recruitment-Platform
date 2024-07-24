import { DECREMENT, INCREMENT, SET_CANDIDATE, SET_CANDIDATE_EMAIL, SET_CURRENT_PAGE, SET_EXPIRED, SET_INEXPIRED, SET_INVALID, SET_INVERIFIED, SET_VALID, SET_VERIFIED } from "../../../common/constants/actionTypes";

export const setCandidate = (candidate) => ({ type: SET_CANDIDATE, payload: candidate });
export const setCandidateEmail = (email) => ({ type: SET_CANDIDATE_EMAIL, payload: email });

export const setCurrentPage = (page) => ({ type: SET_CURRENT_PAGE, payload: page });
export const increment = (length) => ({ type: INCREMENT, payload: length });
export const decrement = () => ({ type: DECREMENT });

export const setValid = () => ({ type: SET_VALID });
export const setInvalid= () => ({ type: SET_INVALID });

export const setExpired = () => ({ type: SET_EXPIRED });
export const setInexpired = () => ({ type: SET_INEXPIRED });

export const setVerified = () => ({ type: SET_VERIFIED });
export const setInverified = () => ({ type: SET_INVERIFIED });