package com.recrutementPlatform.backend.dto;

import com.recrutementPlatform.backend.enums.questionType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class questionDTO {

    private Long id;
    private String question;
    private String image;
    private questionType type;
    private int point;
    private List<answerDTO> answers;
    private Long testId;

}
