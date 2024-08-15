import { apiRequest } from './api';

//candidate
export const getAllCandidates = async () => {
    return await apiRequest("api/candidate");
};

export const updateCandidate = async (candidateDetails) => {
    return await apiRequest("api/candidate/update", 'PUT', candidateDetails);
};

export const deleteCandidates = async (emails) => {
    await apiRequest('api/candidate/delete', 'DELETE', emails);
};


//test
export const getAllTests = async () => {
    return await apiRequest("api/test");
};

export const getTestById = async (id) => {
    return await apiRequest(`api/test/${id}`);
}
