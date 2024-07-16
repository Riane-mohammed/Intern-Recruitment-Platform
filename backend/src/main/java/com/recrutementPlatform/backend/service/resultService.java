package com.recrutementPlatform.backend.service;

import com.recrutementPlatform.backend.dto.resultDTO;
import com.recrutementPlatform.backend.model.candidate;
import com.recrutementPlatform.backend.model.quiz;
import com.recrutementPlatform.backend.model.result;
import com.recrutementPlatform.backend.model.test;
import com.recrutementPlatform.backend.repository.candidateRepository;
import com.recrutementPlatform.backend.repository.quizRepository;
import com.recrutementPlatform.backend.repository.resultRepository;
import com.recrutementPlatform.backend.repository.testRepository;
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

    public List<result> getAllResults() {
        return resultRepo.findAll();
    }

    public result addResult(resultDTO resultInfo) {
        quiz quiz = quizRepo.findById(resultInfo.getQuizId())
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        test test = testRepo.findById(resultInfo.getTestId())
                .orElseThrow(() -> new RuntimeException("Test not found"));

        candidate candidate = candidateRepo.findById(resultInfo.getCandidateId())
                .orElseThrow(() -> new RuntimeException("Candidate not found"));

        if(quiz.getTests().contains(test)) {
            Optional<result> optionalResult = resultRepo.findByQuizAndTestAndCandidate(quiz, test, candidate);

            if(optionalResult.isPresent()) {
                throw new RuntimeException("Result already exists");
            }

            result result = new result();

            result.setScore(resultInfo.getScore());
            result.setQuiz(quiz);
            result.setTest(test);
            result.setCandidate(candidate);
            return resultRepo.save(result);

        }else{
            throw new RuntimeException("Test is not in this Quiz");
        }


    }
}
