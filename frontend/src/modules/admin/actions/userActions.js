import { SET_USER, REMOVE_USER } from "../../../common/constants/actionTypes";

export const setUser = (user) => ({ type: SET_USER, playload: user });
export const removeUser = () => ({ type: REMOVE_USER });