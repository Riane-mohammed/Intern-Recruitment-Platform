package com.recrutementPlatform.backend.controller;

import com.recrutementPlatform.backend.dto.testDTO;
import com.recrutementPlatform.backend.model.test;
import com.recrutementPlatform.backend.service.testService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/test")
public class testController {

    @Autowired
    private testService service;

    @GetMapping
    public List<test> getAllTests(){
        return service.getAllTests();
    }

    @PostMapping("/addTest")
    public test addTest(@RequestBody testDTO test){
        if (test == null) {
            throw new IllegalArgumentException("Test data is required");
        }

        return service.addTest(test);
    }

}
