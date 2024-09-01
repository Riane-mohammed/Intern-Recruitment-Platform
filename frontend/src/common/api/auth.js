import { apiRequest } from './api';

export const login = async (credentials) => {
    return await apiRequest("auth/login", "POST", credentials);
};

export const getProfile = async () => {
    return await apiRequest("auth/profile");
};

export const sendPasswordResetEmail = async (email) => {
    return await apiRequest("api/admin/send-recovery-link", "POST", email);
}

export const verifyPasswordToken = async (token) => {
    return await apiRequest("api/admin/verify-password", "POST", token);
}

export const verifyAdminToken = async (token) => {
    return await apiRequest("api/admin/verify-admin", "POST", token);
}

export const updatePassword = async (newPassObj) => {
    return await apiRequest("api/admin/update-password", "PUT", newPassObj);
}