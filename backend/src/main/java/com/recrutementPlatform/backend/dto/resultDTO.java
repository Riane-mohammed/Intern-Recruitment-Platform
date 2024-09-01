package com.recrutementPlatform.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class resultDTO {

    private BigDecimal score;
    private Long quizId;
    private Long testId;
    private String candidateId;

}
