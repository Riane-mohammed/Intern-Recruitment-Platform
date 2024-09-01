package com.recrutementPlatform.backend.controller;

import com.recrutementPlatform.backend.dto.resultDTO;
import com.recrutementPlatform.backend.model.result;
import com.recrutementPlatform.backend.service.resultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/result")
@CrossOrigin(origins = "http://localhost:3000")
public class resultController {

    @Autowired
    private resultService service;

    @GetMapping
    public List<result> getResult() {
        return service.getAllResults();
    }

    @GetMapping("/{id}")
    public List<result> getResultByQuizId(@PathVariable Long id) {
        return service.getResultByQuizId(id);
    }

    @PostMapping("/add")
    public result addResult(@RequestBody resultDTO result) {
        if (result != null){
            return service.addResult(result);
        }
        throw new IllegalArgumentException("Result is null");
    }
    @GetMapping("/{email}/quiz/{quizId}/test/{testId}/saved")
    public ResponseEntity<Boolean> hasSaved(
            @PathVariable String email,
            @PathVariable Long quizId,
            @PathVariable Long testId
        ) {
        boolean hasPassed = service.hasResultSaved(email, quizId, testId);
        return ResponseEntity.ok(hasPassed);
    }

}
