import { SET_USER, REMOVE_USER, SET_AUTHENTICATED } from "../../../common/constants/actionTypes";

export const setUser = (user) => ({ type: SET_USER, payload: user });
export const removeUser = () => ({ type: REMOVE_USER });

export const setAuthenticated = (bool) => ({ type: SET_AUTHENTICATED, payload: bool });