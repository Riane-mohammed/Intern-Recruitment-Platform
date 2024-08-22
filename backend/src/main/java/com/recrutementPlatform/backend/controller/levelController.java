package com.recrutementPlatform.backend.controller;

import com.recrutementPlatform.backend.model.level;
import com.recrutementPlatform.backend.service.levelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/{id}")
    public level getLevelById(@PathVariable Long id) {
        return service.getLevelById(id);
    }

    @PostMapping("/add")
    public level addLevel(@RequestBody String name) {
        return service.addLevel(name);
    }

    @PutMapping("/update/{id}")
    public level updatelevel(@PathVariable Long id, @RequestBody String name ) {
        return service.updatelevel(id, name);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteLevels(@RequestBody List<Long> ids) {
        service.deleteLevelsId(ids);
        return ResponseEntity.ok("Successfully deleted levels with ids: " + ids);
    }

}
