package com.recrutementPlatform.backend.service;

import com.recrutementPlatform.backend.dto.candidateDTO;
import com.recrutementPlatform.backend.model.candidate;
import com.recrutementPlatform.backend.model.quiz;
import com.recrutementPlatform.backend.repository.candidateRepository;
import com.recrutementPlatform.backend.repository.quizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class candidateService {

    @Autowired
    private candidateRepository candidateRepo;

    @Autowired
    private quizRepository quizRepo;

    public List<candidate> getAllCandidates() {
        return candidateRepo.findAll();
    }

    public candidate addCandidate(candidateDTO candidateInfo) {
        Optional<candidate> optionalCandidate = candidateRepo.findById(candidateInfo.getEmail());

        quiz quiz = quizRepo.findById(candidateInfo.getQuizId())
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        candidate cand;
        if(optionalCandidate.isPresent()) {
            cand = optionalCandidate.get();

            updateCandidateInfo(cand,candidateInfo);

            if(!cand.getQuizzes().contains(quiz)) {
                cand.getQuizzes().add(quiz);
            }else {
                throw new RuntimeException("Quiz already exists for this candidate");
            }

        }else {
            cand = new candidate();
            updateCandidateInfo(cand,candidateInfo);
            cand.getQuizzes().add(quiz);

        }
        return candidateRepo.save(cand);
    }

    private void updateCandidateInfo(candidate cand, candidateDTO candidateInfo) {
        cand.setEmail(candidateInfo.getEmail());
        cand.setFirstName(candidateInfo.getFirstName());
        cand.setLastName(candidateInfo.getLastName());
        cand.setBirthday(candidateInfo.getBirthday());
        cand.setGender(candidateInfo.getGender());
        cand.setPhone(candidateInfo.getPhone());
        cand.setCin(candidateInfo.getCin());
        cand.setAddress(candidateInfo.getAddress());
    }

}
