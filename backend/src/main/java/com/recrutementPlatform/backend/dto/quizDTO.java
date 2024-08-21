package com.recrutementPlatform.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class quizDTO {

    private String title;
    private String description;
    private String emails;
    private List<quizTestDTO> quizTests;
}
