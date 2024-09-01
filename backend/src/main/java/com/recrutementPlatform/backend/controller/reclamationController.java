package com.recrutementPlatform.backend.controller;

import com.recrutementPlatform.backend.dto.reclamationDTO;
import com.recrutementPlatform.backend.dto.reclamationResponseDTO;
import com.recrutementPlatform.backend.model.reclamation;
import com.recrutementPlatform.backend.service.reclamationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/reclamation")
@CrossOrigin(origins = "http://localhost:3000")
public class reclamationController {

    @Autowired
    private reclamationService service;

    @GetMapping
    public List<reclamation> getAll() {
        return service.getAllReclamation();
    }

    @GetMapping("/count")
    public Long countReclamations() {
        return service.getNumberOfReclamation();
    }

    @GetMapping("/count/true")
    public Long countTrueReclamations() {
        return service.countTrueReclamations();
    }

    @GetMapping("/count/false")
    public Long countFalseReclamations() {
        return service.countFalseReclamations();
    }

    @PostMapping("/add")
    public reclamation addReclamation(@RequestBody reclamationDTO reclamationDTO) {
        return service.addReclamation(reclamationDTO);
    }

    @PostMapping("/reply")
    public reclamation reclamationResponse(@RequestBody reclamationResponseDTO response) {
        return service.reclamationResponse(response);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Map<String, Object>> deleteReclamations(@RequestBody List<Long> recIds) {
        service.deleteReclamationByIds(recIds);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Successfully deleted quizzes");
        response.put("ids", recIds);
        return ResponseEntity.ok(response);
    }


}
