package com.recrutementPlatform.backend.service;

import com.recrutementPlatform.backend.dto.candidateDTO;
import com.recrutementPlatform.backend.dto.verificationCodeDTO;
import com.recrutementPlatform.backend.enums.candidateGender;
import com.recrutementPlatform.backend.model.candidate;
import com.recrutementPlatform.backend.model.quiz;
import com.recrutementPlatform.backend.repository.candidateRepository;
import com.recrutementPlatform.backend.repository.quizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.time.Instant;
import java.util.Optional;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
public class candidateService {

    @Autowired
    private candidateRepository candidateRepo;

    @Autowired
    private quizRepository quizRepo;

    @Autowired
    private emailService emailService;

    private final Map<String, verificationCodeDTO> verificationCodes = new ConcurrentHashMap<>();

    public Long getNumberOfCandidates(){
        return candidateRepo.count();
    }

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
                        candidate.getAddress()
                        ))
                .collect(Collectors.toList());
    }

    public void assignQuizToCandidate(String candidateEmail, Long quizId) {
        candidate candidate = candidateRepo.findByEmail(candidateEmail)
                .orElseThrow(() -> new RuntimeException("Candidate not found"));

        quiz quiz = quizRepo.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        // Check if the quiz is already assigned to the candidate
        if (!candidate.getQuizzes().contains(quiz)) {
            candidate.getQuizzes().add(quiz);
            candidateRepo.save(candidate);
        } else {
            System.out.println("Quiz is already assigned to the candidate.");
        }
    }

    public long countMales() {
        return candidateRepo.countNumberofgenders(candidateGender.MALE);
    }

    public long countFemales() {
        return candidateRepo.countNumberofgenders(candidateGender.FEMALE);
    }


    public boolean hasCandidatePassedQuiz(String candidateEmail, Long quizId) {
        candidate candidate = candidateRepo.findByEmail(candidateEmail)
                .orElseThrow(() -> new RuntimeException("Candidate not found"));

        return candidate.getQuizzes().stream()
                .anyMatch(cq -> cq.getId().equals(quizId));
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

        candidate candidate;
        if (optionalCandidate.isPresent()) {
            candidate = optionalCandidate.get();
        } else {
            candidate = new candidate();
        }

        updateCandidateInfo(candidate, candidateInfo);

        return candidateRepo.save(candidate);
    }

    private void updateCandidateInfo(candidate candidate, candidateDTO candidateInfo) {
        candidate.setEmail(candidateInfo.getEmail());
        candidate.setFirstName(candidateInfo.getFirstName());
        candidate.setLastName(candidateInfo.getLastName());
        candidate.setBirthday(candidateInfo.getBirthday());
        candidate.setGender(candidateInfo.getGender());
        candidate.setPhone(candidateInfo.getPhone());
        candidate.setCin(candidateInfo.getCin());
        candidate.setAddress(candidateInfo.getAddress());
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


    public void sendVerificationCode(String email) {
        // Generate a six-digit code
        String code = generateVerificationCode();
        Instant expiration = Instant.now().plusSeconds(600); // 10 minutes validity

        // Store the code in memory
        verificationCodeDTO verificationCode = new verificationCodeDTO(email, code, expiration);
        verificationCodes.put(email, verificationCode);

        // Create email content
        String subject = "Your Verification Code";
        String text = "Your verification code is: " + code;

        // Send the email
        emailService.sendMail(email, subject, text);
    }

    public boolean verifyCode(String email, String code) {
        verificationCodeDTO storedCode = verificationCodes.get(email);
        if (storedCode != null && storedCode.getCode().equals(code) && storedCode.getExpiration().isAfter(Instant.now())) {
            verificationCodes.remove(email);
            return true;
        }
        return false;
    }

    private String generateVerificationCode() {
        Random random = new Random();
        int code = 100000 + random.nextInt(900000);
        return String.valueOf(code);
    }


}
