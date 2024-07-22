package com.recrutementPlatform.backend.controller;

import com.recrutementPlatform.backend.dto.quizDTO;
import com.recrutementPlatform.backend.model.quiz;
import com.recrutementPlatform.backend.service.quizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/quiz")
public class quizController {

    @Autowired
    private quizService service;

    @GetMapping
    public List<quiz> getAllQuizzes(){
        return service.getAllQuizzes();
    }

    @PostMapping("/addQuiz")
    public quiz addQuiz(@RequestBody quizDTO quiz){
        if (quiz == null){
            throw new IllegalArgumentException("quiz object cannot be null");
        }
        return service.addQuiz(quiz);
    }


}
