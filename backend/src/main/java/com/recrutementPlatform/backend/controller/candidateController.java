package com.recrutementPlatform.backend.controller;

import com.recrutementPlatform.backend.dto.candidateDTO;
import com.recrutementPlatform.backend.model.candidate;
import com.recrutementPlatform.backend.service.candidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/candidate")
public class candidateController {

    @Autowired
    private candidateService service;

    @GetMapping
    public List<candidate> getAllCandidates() {
        return service.getAllCandidates();
    }

    @PostMapping("/addCandidate")
    public candidate addCandidate(@RequestBody candidateDTO candidate) {
        if (candidate != null) {
            return service.addCandidate(candidate);
        }else {
            throw new IllegalArgumentException("candidate is null");
        }
    }
}
