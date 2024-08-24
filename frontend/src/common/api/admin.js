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

//quiz
export const getAllQuizzes = async () => {
    return await apiRequest("api/quiz");
};

export const addQuiz = async (quiz) => {
    return await apiRequest("api/quiz/add", 'POST', quiz);
};

export const deleteQuizzes = async (quizzes) => {
    await apiRequest('api/quiz/delete', 'DELETE', quizzes);
};

//test
export const getAllTests = async () => {
    return await apiRequest("api/test");
};

export const getTestById = async (id) => {
    return await apiRequest(`api/test/${id}`);
}

export const addOrUpdateTest = async (test) => {
    return await apiRequest("api/test/addOrUpdate", 'POST', test);
}

export const deleteTests= async (tests) => {
    await apiRequest('api/test/delete', 'DELETE', tests);
};

//question 
export const getAllQuestions = async () => {
    return await apiRequest("api/question");
};

export const deleteQuestions = async (ids) => {
    await apiRequest('api/question/delete', 'DELETE', ids);
};

export const addOrUpdateQuestion = async (QuestionDetails) => {
    return await apiRequest("api/question/addOrUpdate", 'POST', QuestionDetails);
}

//files
export const uploadQuestionImage = async (img) => {
    return await apiRequest("api/file/uploadQuestion", 'POST', img);
}

export const uploadAnswerImage = async (img) => {
    return await apiRequest("api/file/uploadAnswer", 'POST', img);
}

export const deleteImage = async (path) => {
    await apiRequest('api/file/delete', 'DELETE', path);
};