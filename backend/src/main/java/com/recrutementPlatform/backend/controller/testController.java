package com.recrutementPlatform.backend.controller;

import com.recrutementPlatform.backend.dto.testDTO;
import com.recrutementPlatform.backend.model.test;
import com.recrutementPlatform.backend.service.testService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<String> deleteTests(@RequestBody List<Long> ids) {
        try{
            service.deleteTestsByIds(ids);
            return ResponseEntity.ok("Successfully deleted tests with ids: " + ids);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete tests with ids: " + e.getMessage());
        }
    }

}
