package com.recrutementPlatform.backend.controller;

import com.recrutementPlatform.backend.dto.tokenResponseDTO;
import com.recrutementPlatform.backend.dto.tokenRequestDTO;
import com.recrutementPlatform.backend.service.tokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/token")
@CrossOrigin(origins = "http://localhost:3000")
public class tokenController {

    @Autowired
    private tokenService service;

    @PostMapping("/verify")
    public ResponseEntity<tokenResponseDTO> validateToken(@RequestBody tokenRequestDTO request) {
        String tokenValue = request.getToken();
        tokenResponseDTO response = service.validateToken(tokenValue);
        return ResponseEntity.ok(response);
    }

}
