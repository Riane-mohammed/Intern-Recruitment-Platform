package com.recrutementPlatform.backend.controller;

import com.recrutementPlatform.backend.dto.reclamationDTO;
import com.recrutementPlatform.backend.dto.reclamationResponseDTO;
import com.recrutementPlatform.backend.model.reclamation;
import com.recrutementPlatform.backend.service.reclamationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/reclamation")
public class reclamationController {

    @Autowired
    private reclamationService service;

    @GetMapping
    public List<reclamation> getAll() {
        return service.getAllReclamation();
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
    public ResponseEntity<String> deleteReclamations(@RequestBody List<Long> recIds) {
        service.deleteReclamationByIds(recIds);
        return ResponseEntity.ok("Successfully deleted Reclamations with ids: " + recIds);
    }


}
