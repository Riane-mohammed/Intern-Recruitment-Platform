import { apiRequest } from './api';

export const login = async (credentials) => {
    return await apiRequest("auth/login", "POST", credentials);
};

export const getProfile = async () => {
    return await apiRequest("auth/profile");
};