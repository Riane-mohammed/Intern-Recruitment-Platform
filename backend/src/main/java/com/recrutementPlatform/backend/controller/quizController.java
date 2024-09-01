package com.recrutementPlatform.backend.controller;

import com.recrutementPlatform.backend.dto.quizDTO;
import com.recrutementPlatform.backend.model.quiz;
import com.recrutementPlatform.backend.service.quizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("api/quiz")
@CrossOrigin(origins = "http://localhost:3000")
public class quizController {

    @Autowired
    private quizService service;

    @GetMapping
    public List<quiz> getAllQuizzes(){
        return service.getAllQuizzes();
    }

    @GetMapping("/count")
    public Long countQuizzes(){
        return service.getNumberOfQuizzes();
    }

    @GetMapping("/latest")
    public quiz getLatestQuiz() {
        return service.getLastQuiz();
    }

    @GetMapping("/{id}")
    public Optional<quiz> getQuizById(@PathVariable Long id){
        return service.getQuizById(id);
    }

    @PostMapping("/add")
    public ResponseEntity<quiz> addQuiz(@RequestBody quizDTO quizDTO) {
        quiz createdQuiz = service.addQuiz(quizDTO);
        return ResponseEntity.ok(createdQuiz);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Map<String, Object>> deleteQuizzes(@RequestBody List<Long> quizIds) {
        service.deleteQuizzesByIds(quizIds);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Successfully deleted quizzes");
        response.put("ids", quizIds);
        return ResponseEntity.ok(response);
    }

}
