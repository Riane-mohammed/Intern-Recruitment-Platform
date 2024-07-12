package com.recrutementPlatform.backend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.recrutementPlatform.backend.enums.candidateGender;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class candidate {

    @Id
    private String email;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Temporal(TemporalType.DATE)
    private Date birthday;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private candidateGender gender;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String cin;

    @Column(nullable = false)
    private String address;

    @OneToMany(mappedBy = "candidate")
    @JsonManagedReference
    private List<token> tokens;

    @OneToMany(mappedBy = "candidate")
    @JsonManagedReference
    private List<result> results;

}
