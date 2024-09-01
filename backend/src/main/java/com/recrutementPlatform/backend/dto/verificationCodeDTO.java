package com.recrutementPlatform.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class verificationCodeDTO {

    private String email;
    private String code;
    private Instant expiration;

}