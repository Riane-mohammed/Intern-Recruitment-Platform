package com.recrutementPlatform.backend.dto;

import com.recrutementPlatform.backend.enums.questionType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class questionDTO {

    private String question;
    private questionType type;
    private Long testId;

}
