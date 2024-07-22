package com.recrutementPlatform.backend.controller;

import com.recrutementPlatform.backend.model.testSection;
import com.recrutementPlatform.backend.service.sectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/section")
public class sectionController {

    @Autowired
    private sectionService service;

    @GetMapping
    public List<testSection> getAllSections() {
        return service.getAllSections();
    }

}
