package com.recrutementPlatform.backend.controller;

import com.recrutementPlatform.backend.dto.questionDTO;
import com.recrutementPlatform.backend.model.question;
import com.recrutementPlatform.backend.service.questionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/question")
public class questionController {

    @Autowired
    private questionService service;

    @GetMapping
    public List<question> getAllQuestions() {
        return service.getAllQuestions();
    }

    @PostMapping("/addQuestion")
    public question addQuestion(@RequestBody questionDTO question) {
        if (question == null){
            throw new IllegalArgumentException("Question cannot be null");
        }
        return service.addQuestion(question);
    }

}
