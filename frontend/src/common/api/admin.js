import { apiRequest } from './api';

//section
export const getAllSections = async () => {
    return await apiRequest("api/section");
};

//level
export const getAllLevels = async () => {
    return await apiRequest("api/level");
};

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

//question 
export const getAllQuestions = async () => {
    return await apiRequest("api/question");
};
