package com.recrutementPlatform.backend.service;

import com.recrutementPlatform.backend.dto.tokenResponseDTO;
import com.recrutementPlatform.backend.model.quiz;
import com.recrutementPlatform.backend.model.token;
import com.recrutementPlatform.backend.repository.tokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class tokenService {

    @Autowired
    private tokenRepository tokenRepo;

    public tokenResponseDTO validateToken(String tokenValue) {
        token token = tokenRepo.findByValue(tokenValue)
                .orElseThrow(() -> new RuntimeException("token not found"));

        if (token.getExpirationDate().before(new Date())) {
            throw new RuntimeException("Token has expired");
        }

        quiz quiz = token.getQuiz();
        String email = token.getEmail();

        return new tokenResponseDTO(email, quiz);
    }

}
