package com.recrutementPlatform.backend.controller;

import com.recrutementPlatform.backend.dto.candidateDTO;
import com.recrutementPlatform.backend.model.candidate;
import com.recrutementPlatform.backend.service.candidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

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

}
