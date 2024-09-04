import { apiRequest } from './api';

//admin 
export const getAllAdmins = async () => {
    return await apiRequest("api/admin/all-admins");
};

export const updateAdmin = async (admin) => {
    return await apiRequest("api/admin/update", 'PUT', admin);
};

export const upgradeAdmin = async (id) => {
    return await apiRequest(`api/admin/${id}/upgrade`, 'PUT');
};

export const downgradeAdmin = async (id) => {
    return await apiRequest(`api/admin/${id}/downgrade`, 'PUT');
};

export const addAdmin = async (admin) => {
    return await apiRequest("api/admin/add", 'POST', admin);
};

export const getAllUsernames = async () => {
    return await apiRequest("api/admin/usernames");
};

export const getAllEmails = async () => {
    return await apiRequest("api/admin/emails");
};

export const deleteAdmins = async (ids) => {
    await apiRequest('api/admin/delete', 'DELETE', ids);
};

//section
export const getAllSections = async () => {
    return await apiRequest("api/section");
};

export const addSetion = async (section) => {
    return await apiRequest("api/section/add", 'POST', section);
};

export const deleteSections = async (ids) => {
    await apiRequest('api/section/delete', 'DELETE', ids);
};

export const updateSection = async (id, section) => {
    await apiRequest(`api/section/update/${id}`, 'PUT', section);
};

//level
export const getAllLevels = async () => {
    return await apiRequest("api/level");
};

export const addLevel = async (name) => {
    return await apiRequest("api/level/add", 'POST', name);
};

export const deleteLevel = async (id) => {
    return await apiRequest("api/level/delete", 'DELETE', id);
};

//candidate
export const getAllCandidates = async () => {
    return await apiRequest("api/candidate");
};

export const getNumberOfCandidates = async () => {
    return await apiRequest("api/candidate/count");
};

export const getNumberOfMaleCandidates = async () => {
    return await apiRequest("api/candidate/count/males");
};

export const getNumberOfFemaleCandidates = async () => {
    return await apiRequest("api/candidate/count/females");
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

export const getLatestQuiz = async () => {
    return await apiRequest("api/quiz/latest");
};

export const getNumberOfQuizzes = async () => {
    return await apiRequest("api/quiz/count");
};

export const getQuizById = async (id) => {
    return await apiRequest(`api/quiz/${id}`);
};

export const addQuiz = async (quiz) => {
    return await apiRequest("api/quiz/add", 'POST', quiz);
};

export const deleteQuizzes = async (quizzes) => {
    await apiRequest('api/quiz/delete', 'DELETE', quizzes);
};

//results
export const getResultById = async (id) => {
    return await apiRequest(`api/result/${id}`);
};

//acceptation
export const getAllAcceptation = async () => {
    return await apiRequest("api/acceptation");
};

export const getNumberOfAll = async () => {
    return await apiRequest("api/acceptation/all");
};

export const getNumberOfAccepted = async () => {
    return await apiRequest("api/acceptation/accepted");
};

export const getNumberOfWaiting = async () => {
    return await apiRequest("api/acceptation/waiting");
};

export const hasAccepted = async (candidateId, quizId) => {
    return await apiRequest(`api/acceptation/candidate/${candidateId}/quiz/${quizId}`);
};

export const setAccepted = async (reply) => {
    return await apiRequest("api/acceptation/setAccepted", 'POST', reply);
}

//test
export const getAllTests = async () => {
    return await apiRequest("api/test");
};

export const getNumberOfTests = async () => {
    return await apiRequest("api/test/count");
};

export const getNumberOfTestsByLevel = async (level) => {
    return await apiRequest("api/test/count/level", 'POST', level);
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

//reclamation
export const getAllReclamations = async () => {
    return await apiRequest("api/reclamation");
};

export const getFalseReclamations = async () => {
    return await apiRequest("api/reclamation/count/false");
};

export const replyToReclamation = async (reply) => {
    return await apiRequest("api/reclamation/reply", 'POST', reply);
}

export const deleteReclamation = async (ids) => {
    await apiRequest('api/reclamation/delete', 'DELETE', ids);
};

export const addReclamation = async (reclamation) => {
    return await apiRequest("api/reclamation/add", 'POST', reclamation);
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