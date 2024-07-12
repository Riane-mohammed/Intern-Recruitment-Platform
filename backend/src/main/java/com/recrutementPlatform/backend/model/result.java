package com.recrutementPlatform.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class result {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer score;

    @Column(name = "taken_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date takenAt;

    @ManyToOne
    @JoinColumn(name = "quiz_id")
    @JsonBackReference
    private quiz quiz;

    @ManyToOne
    @JoinColumn(name = "test_id")
    @JsonBackReference
    private test test;

    @ManyToOne
    @JoinColumn(name = "cadidate_id")
    @JsonBackReference
    private candidate candidate;

    @PrePersist
    protected void onCreate() {
        takenAt = new Date();
    }
}
