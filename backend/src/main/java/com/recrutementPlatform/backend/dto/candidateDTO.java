package com.recrutementPlatform.backend.dto;

import com.recrutementPlatform.backend.enums.candidateGender;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class candidateDTO {

    private String email;
    private String firstName;
    private String lastName;
    private Date birthday;
    private candidateGender gender;
    private String phone;
    private String cin;
    private String address;
    private Long quizId;

}
