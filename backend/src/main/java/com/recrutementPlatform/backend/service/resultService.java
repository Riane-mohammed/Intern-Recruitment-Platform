package com.recrutementPlatform.backend.service;

import com.recrutementPlatform.backend.dto.resultDTO;
import com.recrutementPlatform.backend.model.*;
import com.recrutementPlatform.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class resultService {

    @Autowired
    private resultRepository resultRepo;

    @Autowired
    private quizRepository quizRepo;

    @Autowired
    private testRepository testRepo;

    @Autowired
    private candidateRepository candidateRepo;

    @Autowired
    private candQuizStatusRepository candQuizRepo;

    public List<result> getAllResults() {
        return resultRepo.findAll();
    }

    public List<result> getResultByQuizId(Long quizId) {
        quiz quiz = quizRepo.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        return resultRepo.findByQuiz(quiz);
    }

    public result addResult(resultDTO resultInfo) {
        quiz quiz = quizRepo.findById(resultInfo.getQuizId())
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        test test = testRepo.findById(resultInfo.getTestId())
                .orElseThrow(() -> new RuntimeException("Test not found"));

        candidate candidate = candidateRepo.findById(resultInfo.getCandidateId())
                .orElseThrow(() -> new RuntimeException("Candidate not found"));

        // Check if the test is part of the quiz using the QuizTest relationship
        Optional<quizTest> quizTestOpt = quiz.getQuizTests().stream()
                .filter(quizTest -> quizTest.getTest().equals(test))
                .findFirst();

        if (quizTestOpt.isPresent()) {
            Optional<result> optionalResult = resultRepo.findByQuizAndTestAndCandidate(quiz, test, candidate);

            if (optionalResult.isPresent()) {
                throw new RuntimeException("Result already exists");
            }

            result result = new result();
            result.setScore(resultInfo.getScore());
            result.setQuiz(quiz);
            result.setTest(test);
            result.setCandidate(candidate);

            candidateQuizStatus candQuiz = new candidateQuizStatus(quiz, candidate);
            candQuizRepo.save(candQuiz);

            return resultRepo.save(result);
        } else {
            throw new RuntimeException("Test is not in this Quiz");
        }
    }

    public boolean hasResultSaved(String candidateEmail, Long quizId, Long testId) {
        quiz quiz = quizRepo.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        test test = testRepo.findById(testId)
                .orElseThrow(() -> new RuntimeException("Test not found"));

        candidate candidate = candidateRepo.findById(candidateEmail)
                .orElseThrow(() -> new RuntimeException("Candidate not found"));

        Optional<result> result = resultRepo.findByQuizAndTestAndCandidate(quiz, test, candidate);

        if (result.isPresent()) {
            return true;
        }

        return false;
    }

}
