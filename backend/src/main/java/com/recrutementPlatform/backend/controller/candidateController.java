package com.recrutementPlatform.backend.controller;

import com.recrutementPlatform.backend.dto.candidateDTO;
import com.recrutementPlatform.backend.model.candidate;
import com.recrutementPlatform.backend.service.candidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/candidate")
@CrossOrigin(origins = "http://localhost:3000")
public class candidateController {

    @Autowired
    private candidateService service;

    @GetMapping
    public List<candidateDTO> getAllCandidates() {
        return service.getAllCandidates();
    }

    @GetMapping("/count")
    public Long countCandidates() {
        return service.getNumberOfCandidates();
    }

    @GetMapping("/count/males")
    public long countMaleCandidates() {
        return service.countMales();
    }

    @GetMapping("/count/females")
    public long countFemaleCandidates() {
        return service.countFemales();
    }

    @PutMapping("/update")
    public candidate updateCandidate(@RequestBody candidateDTO newCandidateDetails) {
        return service.updateCandidate(newCandidateDetails);
    }

    @PostMapping("/add")
    public candidate addCandidate(@RequestBody candidateDTO candidate) {
        if (candidate != null) {
            return service.addCandidate(candidate);
        }else {
            throw new IllegalArgumentException("candidate is null");
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteCandidates(@RequestBody List<String> emails) {
        service.deleteCandidatesByEmails(emails);
        return ResponseEntity.ok().body(Collections.singletonMap("message", "Candidates deleted successfully"));
    }

    @PostMapping("/{email}/quiz/{quizId}")
    public ResponseEntity<Map<String, Object>> assignQuiz(@PathVariable String email, @PathVariable Long quizId) {
        service.assignQuizToCandidate(email, quizId);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Quiz assigned to candidate");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{email}/quiz/{quizId}/passed")
    public ResponseEntity<Boolean> hasPassed(
            @PathVariable String email,
            @PathVariable Long quizId) {

        boolean hasPassed = service.hasCandidatePassedQuiz(email, quizId);
        return ResponseEntity.ok(hasPassed);
    }

    @PostMapping("/send-code")
    public ResponseEntity<Map<String, Object>> sendCode(@RequestBody EmailRequest emailRequest) {
        String email = emailRequest.getEmail();
        service.sendVerificationCode(email);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Verification code sent");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/verify-code")
    public ResponseEntity<ResponseMessage> verifyCode(@RequestBody VerificationRequest verificationRequest) {
        String email = verificationRequest.getEmail();
        String code = verificationRequest.getCode();
        boolean isValid = service.verifyCode(email, code);

        if (isValid) {
            return ResponseEntity.ok(new ResponseMessage("Email verified successfully"));
        } else {
            return ResponseEntity.status(400).body(new ResponseMessage("Invalid verification code"));
        }
    }

    public static class EmailRequest {
        private String email;

        public String getEmail() {
            return email;
        }
    }

    public static class VerificationRequest {
        private String email;
        private String code;

        // Getters and setters
        public String getEmail() {
            return email;
        }
        public String getCode() {
            return code;
        }
    }

    public static class ResponseMessage {
        private String message;

        public ResponseMessage(String message) {
            this.message = message;
        }

        // Getter
        public String getMessage() {
            return message;
        }
    }

}
