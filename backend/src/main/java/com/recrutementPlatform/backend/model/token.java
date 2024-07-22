package com.recrutementPlatform.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class token {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String value;

    @ManyToOne
    @JoinColumn(name = "quiz_id")
    @JsonManagedReference
    private quiz quiz;

    @ManyToOne
    @JoinColumn(name = "candidate_id")
    @JsonBackReference
    private candidate candidate;

    @Temporal(TemporalType.TIMESTAMP)
    private Date expirationDate;
}
