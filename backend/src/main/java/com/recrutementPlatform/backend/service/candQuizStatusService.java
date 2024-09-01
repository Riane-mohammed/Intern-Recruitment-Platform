package com.recrutementPlatform.backend.service;

import com.recrutementPlatform.backend.dto.acceptationRequestDTO;
import com.recrutementPlatform.backend.dto.reclamationResponseDTO;
import com.recrutementPlatform.backend.model.candidate;
import com.recrutementPlatform.backend.model.quiz;
import com.recrutementPlatform.backend.model.reclamation;
import com.recrutementPlatform.backend.repository.candQuizStatusRepository;
import com.recrutementPlatform.backend.model.candidateQuizStatus;
import com.recrutementPlatform.backend.repository.candidateRepository;
import com.recrutementPlatform.backend.repository.quizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static com.recrutementPlatform.backend.util.stringUtil.splitEmails;

@Service
public class candQuizStatusService {

    @Autowired
    private candQuizStatusRepository candQuizRepo;

    @Autowired
    private candidateRepository candidateRepo;

    @Autowired
    private quizRepository quizRepo;

    @Autowired
    private emailService emailService;

    public List<candidateQuizStatus> getAll(){
        return candQuizRepo.findAll();
    }

    public Long getNumberOfCandQuizStatus() {
        return candQuizRepo.count();
    }

    public long countTrueCandQuizStatus() {
        return candQuizRepo.countNumberOfCandQuizStatus(true);
    }

    public long countFalseCandQuizStatus() {
        return candQuizRepo.countNumberOfCandQuizStatus(false);
    }

    public boolean hasAccepted(String candidateId, Long quizId){
        quiz quiz = quizRepo.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        candidate cand = candidateRepo.findByEmail(candidateId)
                .orElseThrow(() -> new RuntimeException("Candidate not found"));

        List<candidateQuizStatus> candQuizStatusList = candQuizRepo.findByQuizAndCandidate(quiz, cand);

        if (candQuizStatusList.isEmpty()) {
            throw new RuntimeException("No candidate quiz status found");
        }

        return candQuizStatusList.get(0).isAccepted();
    }

    @Transactional
    public void acceptationResponse(acceptationRequestDTO response) {
        quiz quiz = quizRepo.findById(response.getQuizId())
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        List<String> candidateEmails = response.getCandidateId();

        for (String email : candidateEmails) {
            candidate candidate = candidateRepo.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Candidate not found"));

            List<candidateQuizStatus> candQuizList = candQuizRepo.findByQuizAndCandidate(quiz, candidate);

            if (candQuizList.isEmpty()) {
                throw new RuntimeException("No candidate quiz status found");
            }

            for (candidateQuizStatus candQuizStatus : candQuizList) {
                candQuizStatus.setAccepted(true);
                candQuizRepo.save(candQuizStatus);
            }

            emailService.sendMail(email, response.getSubject(), response.getResponse());
        }
    }


}
