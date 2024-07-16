package com.recrutementPlatform.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class answerDTO {

    private String answer;
    private Boolean isCorrect;
    private Long questionId;

}
