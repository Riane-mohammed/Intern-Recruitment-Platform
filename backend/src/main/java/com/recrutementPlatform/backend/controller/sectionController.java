package com.recrutementPlatform.backend.controller;

import com.recrutementPlatform.backend.dto.sectionDTO;
import com.recrutementPlatform.backend.model.testSection;
import com.recrutementPlatform.backend.service.sectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/section")
@CrossOrigin(origins = "http://localhost:3000")
public class sectionController {

    @Autowired
    private sectionService service;

    @GetMapping
    public List<testSection> getAllSections() {
        return service.getAllSections();
    }

    @GetMapping("/{id}")
    public testSection getSectionById(@PathVariable Long id) {
        return service.getSectionById(id);
    }

    @PostMapping("/add")
    public testSection addSection(@RequestBody sectionDTO section) {
        return service.addSection(section);
    }

    @PutMapping("/update/{id}")
    public testSection updateSection(@PathVariable Long id, @RequestBody sectionDTO section ) {
        return service.updateSection(id, section);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Map<String, Object>> deleteSections(@RequestBody List<Long> ids) {
        service.deleteSectionsId(ids);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Successfully deleted sections");
        response.put("ids", ids);
        return ResponseEntity.ok(response);
    }

}
