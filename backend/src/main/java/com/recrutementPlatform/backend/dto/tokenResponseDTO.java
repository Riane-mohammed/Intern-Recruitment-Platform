package com.recrutementPlatform.backend.dto;

import com.recrutementPlatform.backend.model.quiz;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class tokenResponseDTO {
    private String email;
    private quiz quiz;
}
