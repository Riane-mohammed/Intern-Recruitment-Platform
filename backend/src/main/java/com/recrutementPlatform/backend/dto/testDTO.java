package com.recrutementPlatform.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class testDTO {

    private Long id;
    private String title;
    private Long levelId;
    private Long sectionId;
    private List<questionDTO> questions;

}
