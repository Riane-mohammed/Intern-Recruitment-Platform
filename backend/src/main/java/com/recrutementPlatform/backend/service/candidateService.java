package com.recrutementPlatform.backend.service;

import com.recrutementPlatform.backend.dto.candidateDTO;
import com.recrutementPlatform.backend.model.candidate;
import com.recrutementPlatform.backend.model.quiz;
import com.recrutementPlatform.backend.repository.candidateRepository;
import com.recrutementPlatform.backend.repository.quizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class candidateService {

    @Autowired
    private candidateRepository candidateRepo;

    @Autowired
    private quizRepository quizRepo;

    public List<candidateDTO> getAllCandidates() {
        return candidateRepo.findAll().stream()
                .map(candidate -> new candidateDTO(
                        candidate.getEmail(),
                        candidate.getFirstName(),
                        candidate.getLastName(),
                        candidate.getBirthday(),
                        candidate.getGender(),
                        candidate.getPhone(),
                        candidate.getCin(),
                        candidate.getAddress(),
                        null
                        ))
                .collect(Collectors.toList());
    }

    public candidate updateCandidate(candidateDTO newCandidateDetails) {
        return candidateRepo.findByEmail(newCandidateDetails.getEmail()).map(candidate -> {
            candidate.setFirstName(newCandidateDetails.getFirstName());
            candidate.setLastName(newCandidateDetails.getLastName());
            candidate.setBirthday(newCandidateDetails.getBirthday());
            candidate.setGender(newCandidateDetails.getGender());
            candidate.setPhone(newCandidateDetails.getPhone());
            candidate.setCin(newCandidateDetails.getCin());
            candidate.setAddress(newCandidateDetails.getAddress());
            return candidateRepo.save(candidate);
        }).orElseThrow(() -> new RuntimeException("User not found with email : " + newCandidateDetails.getEmail()));
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

    @Transactional
    public void deleteCandidatesByEmails(List<String> emails) {
        System.out.println("Attempting to delete emails: " + emails);
        if (emails != null && !emails.isEmpty()) {
            try {
                candidateRepo.deleteByEmailIn(emails);
                System.out.println("Successfully deleted candidates with emails: " + emails);
            } catch (Exception e) {
                System.err.println("Failed to delete candidates: " + e.getMessage());
                throw e;
            }
        } else {
            throw new IllegalArgumentException("Email list is null or empty");
        }
    }


}
