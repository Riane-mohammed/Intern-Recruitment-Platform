package com.recrutementPlatform.backend.dto;

import lombok.Data;

import java.util.List;

@Data
public class addAnswerDTO {
    private List<answerDTO> answers;
    private Long questionId;
}