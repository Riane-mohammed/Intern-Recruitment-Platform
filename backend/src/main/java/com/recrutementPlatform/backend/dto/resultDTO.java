package com.recrutementPlatform.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class resultDTO {

    private Integer score;
    private Long quizId;
    private Long testId;
    private String candidateId;

}
