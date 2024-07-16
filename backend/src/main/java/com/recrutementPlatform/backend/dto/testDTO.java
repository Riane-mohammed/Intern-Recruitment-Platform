package com.recrutementPlatform.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class testDTO {

    private String title;
    private int duration;
    private int nbrQst;
    private Long levelId;
    private Long sectionId;

}
