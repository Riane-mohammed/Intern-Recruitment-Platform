package com.recrutementPlatform.backend.controller;

import com.recrutementPlatform.backend.dto.acceptationRequestDTO;
import com.recrutementPlatform.backend.model.candidateQuizStatus;
import com.recrutementPlatform.backend.service.candQuizStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/acceptation")
@CrossOrigin(origins = "http://localhost:3000")
public class candidateQuizStatusController {

    @Autowired
    private candQuizStatusService service;

    @GetMapping
    public List<candidateQuizStatus> getAll(){
        return service.getAll();
    }

    @GetMapping("/all")
    public Long getNumberOfCandQuizStatus(){
        return service.getNumberOfCandQuizStatus();
    }

    @GetMapping("/accepted")
    public long countTrueCandQuizStatus() {
        return service.countTrueCandQuizStatus();
    }

    @GetMapping("/waiting")
    public long countFalseCandQuizStatus() {
        return service.countFalseCandQuizStatus();
    }

    @GetMapping("/candidate/{candidateId}/quiz/{quizId}")
    public boolean hasAccepted(@PathVariable String candidateId,@PathVariable Long quizId){
        return service.hasAccepted(candidateId, quizId);
    }

    @PostMapping("/setAccepted")
    public ResponseEntity<Map<String, Object>> setAccepted(@RequestBody acceptationRequestDTO response) {
        // Call your service method
        service.acceptationResponse(response);

        // Prepare the response body
        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("success", true);
        responseBody.put("message", "Candidate accepted successfully");

        // Return the response entity with the map and HTTP status
        return ResponseEntity.ok(responseBody);
    }

}
