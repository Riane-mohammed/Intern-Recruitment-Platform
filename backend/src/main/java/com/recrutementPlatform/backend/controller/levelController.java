package com.recrutementPlatform.backend.controller;

import com.recrutementPlatform.backend.model.level;
import com.recrutementPlatform.backend.service.levelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/level")
@CrossOrigin(origins = "http://localhost:3000")
public class levelController {

    @Autowired
    private levelService service;

    @GetMapping
    public List<level> getAllLevels() {
        return service.getAllLevels();
    }

}
