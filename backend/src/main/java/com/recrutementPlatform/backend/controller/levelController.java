package com.recrutementPlatform.backend.controller;

import com.recrutementPlatform.backend.model.level;
import com.recrutementPlatform.backend.service.levelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
        return service.addLevel(name.substring(1, name.length() - 1));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Map<String, Object>> deleteLevel(@RequestBody Long id) {
        service.deleteLevelId(id);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Successfully deleted level");
        response.put("ids", id);
        return ResponseEntity.ok(response);
    }

}
