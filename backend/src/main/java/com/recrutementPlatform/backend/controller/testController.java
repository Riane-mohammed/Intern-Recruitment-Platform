package com.recrutementPlatform.backend.controller;

import com.recrutementPlatform.backend.dto.testDTO;
import com.recrutementPlatform.backend.model.level;
import com.recrutementPlatform.backend.model.test;
import com.recrutementPlatform.backend.service.testService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/test")
@CrossOrigin(origins = "http://localhost:3000")
public class testController {

    @Autowired
    private testService service;

    @GetMapping
    public List<test> getAllTests(){
        return service.getAllTests();
    }

    @GetMapping("/count")
    public Long countTests() {
        return service.getNumberOfTests();
    }

    @PostMapping("/count/level")
    public Long countTestsByLevel(@RequestBody level level) {
        return service.getNumberOfTestsByLevel(level);
    }

    @GetMapping("/{id}")
    public test getTestById(@PathVariable Long id) {
        if (id == null) {
            throw new IllegalArgumentException("id data is required");
        }
        return service.getTestById(id);
    }

    @PostMapping("/addOrUpdate")
    public ResponseEntity<test> addOrUpdateTest(@RequestBody testDTO testDetails) {
        test newTest = service.addOrUpdateTest(testDetails);
        return new ResponseEntity<>(newTest, HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Map<String, Object>> deleteTests(@RequestBody List<Long> ids) {
        service.deleteTestsByIds(ids);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Successfully deleted tests");
        response.put("ids", ids);
        return ResponseEntity.ok(response);
    }
}
