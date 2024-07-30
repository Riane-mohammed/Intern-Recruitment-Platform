import { DECREMENT, INCREMENT, INCREMENT_QUESTION_NUMBER, SET_CANDIDATE, SET_CANDIDATE_EMAIL, SET_CURRENT_PAGE, SET_DISQUALIFIED, SET_EXPIRED, SET_FINISHED, SET_PREVIOUS_PATH, SET_QUESTION_NUMBER, SET_STARTED, SET_VALID, SET_VERIFIED } from "../../../common/constants/actionTypes";

export const setCandidate = (candidate) => ({ type: SET_CANDIDATE, payload: candidate });
export const setCandidateEmail = (email) => ({ type: SET_CANDIDATE_EMAIL, payload: email });

export const setPreviousPath = (path) => ({ type: SET_PREVIOUS_PATH, payload: path });

export const setCurrentPage = (page) => ({ type: SET_CURRENT_PAGE, payload: page });
export const increment = (length) => ({ type: INCREMENT, payload: length });
export const decrement = () => ({ type: DECREMENT });

export const setValid = (bool) => ({ type: SET_VALID, payload: bool });
export const setExpired = (bool) => ({ type: SET_EXPIRED, payload: bool });
export const setVerified = (bool) => ({ type: SET_VERIFIED, payload: bool });
export const setDisqualified = (bool) => ({ type: SET_DISQUALIFIED, payload: bool });

export const setStarted = (bool) => ({ type: SET_STARTED, payload: bool });
export const setFinished = (bool) => ({ type: SET_FINISHED, payload: bool });

export const setQuestionNumber = (number) => ({ type: SET_QUESTION_NUMBER, payload: number });
export const incrementQuestionNumber = (length) => ({ type: INCREMENT_QUESTION_NUMBER, payload: length });