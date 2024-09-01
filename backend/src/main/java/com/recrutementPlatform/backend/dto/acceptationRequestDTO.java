package com.recrutementPlatform.backend.dto;

import lombok.Data;

import java.util.List;

@Data
public class acceptationRequestDTO {

    private Long quizId;
    private List<String> candidateId;
    private String subject;
    private String response;

}
