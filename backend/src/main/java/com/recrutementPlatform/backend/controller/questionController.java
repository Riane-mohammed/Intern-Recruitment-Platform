package com.recrutementPlatform.backend.controller;

import com.recrutementPlatform.backend.dto.questionDTO;
import com.recrutementPlatform.backend.model.question;
import com.recrutementPlatform.backend.service.questionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/question")
@CrossOrigin(origins = "http://localhost:3000")
public class questionController {

    @Autowired
    private questionService service;

    @GetMapping
    public List<question> getAllQuestions() {
        return service.getAllQuestions();
    }

    @PostMapping("/addOrUpdate")
    public ResponseEntity<question> addOrUpdateQuestion(@RequestBody questionDTO questionDTO) {
        question updatedQuestion = service.addOrUpdateQuestion(questionDTO);
        return new ResponseEntity<>(updatedQuestion, HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Map<String, Object>> deleteQuestionsByIds(@RequestBody List<Long> ids) {
        service.deleteQuestionsByIds(ids);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Successfully deleted questions");
        response.put("ids", ids);
        return ResponseEntity.ok(response);
    }


}
