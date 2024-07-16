package com.recrutementPlatform.backend.controller;

import com.recrutementPlatform.backend.dto.answerDTO;
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

    @PostMapping("/addAnswer")
    public answer addAnswer(@RequestBody answerDTO answer) {
        if(answer != null) {
            return service.AddAnswer(answer);
        }else{
            throw new IllegalArgumentException("Answer already exists");
        }
    }

}
