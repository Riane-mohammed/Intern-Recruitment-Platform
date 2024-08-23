package com.recrutementPlatform.backend.controller;

import com.recrutementPlatform.backend.model.answer;
import com.recrutementPlatform.backend.service.answerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/answer")
public class answerController {

    @Autowired
    private answerService service;

    @GetMapping
    public List<answer> getAllAnswers() {
        return service.getAllAnswers();
    }

}
