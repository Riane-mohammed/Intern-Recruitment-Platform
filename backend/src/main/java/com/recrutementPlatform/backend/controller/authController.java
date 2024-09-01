package com.recrutementPlatform.backend.controller;

import com.recrutementPlatform.backend.dto.authDTO;
import com.recrutementPlatform.backend.model.admin;
import com.recrutementPlatform.backend.service.authService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
@CrossOrigin(origins = "http://localhost:3000")
public class authController {

    @Autowired
    private authService service;

    @PostMapping("/login")
    public admin login(@RequestBody authDTO user){
        if (user == null){
            throw new IllegalArgumentException("user object cannot be null");
        }
        return service.login(user);
    }

}
