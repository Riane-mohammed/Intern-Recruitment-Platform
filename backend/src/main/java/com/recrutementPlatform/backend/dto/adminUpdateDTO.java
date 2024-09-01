package com.recrutementPlatform.backend.dto;

import lombok.Data;

@Data
public class adminUpdateDTO {

    private Long id;
    private String username;
    private String oldPassword;
    private String newPassword;
}
