import { apiRequest } from './api';

//candidats
export const addCandidate = async (candidate) => {
    return await apiRequest("api/candidate/add", 'POST', candidate);
};

//token
export const verifyToken = async (token) => {
    return await apiRequest("api/token/verify", 'POST', token);
};

//email verification
export const sendCode = async (code) => {
    return await apiRequest("api/candidate/send-code", 'POST', code);
};

export const verifyCode = async (code) => {
    return await apiRequest("api/candidate/verify-code", 'POST', code);
};

//candidate passes exam

export const assignQuiz = async (email, quizId) => {
    return await apiRequest(`api/candidate/${email}/quiz/${quizId}`, 'POST', null);
};

export const hasPassed = async (email, quizId) => {
    return await apiRequest(`api/candidate/${email}/quiz/${quizId}/passed`);
};

//result
export const assignResult = async (result) => {
    return await apiRequest("api/result/add", 'POST', result);
};

export const hasResultSaved = async (email, quizId, testId) => {
    return await apiRequest(`api/result/${email}/quiz/${quizId}/test/${testId}/saved`);
};