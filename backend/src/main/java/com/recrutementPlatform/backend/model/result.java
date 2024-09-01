package com.recrutementPlatform.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class result {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal score;

    @Column(name = "taken_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date takenAt;

    @ManyToOne
    @JoinColumn(name = "quiz_id")
    @JsonManagedReference
    @JsonIgnore
    private quiz quiz;

    @ManyToOne
    @JoinColumn(name = "test_id")
    @JsonIgnore
    private test test;

    @ManyToOne
    @JoinColumn(name = "cadidate_id")
    @JsonBackReference
    private candidate candidate;

    @Transient
    private Long testId;

    @Transient
    private Long quizId;

    @Transient
    private String candidateId;

    @PostLoad
    private void setIds() {
        if (this.test != null) {
            this.testId = this.test.getId();
        }
        if (this.candidate != null) {
            this.candidateId = this.candidate.getEmail();
        }
        if (this.quiz != null) {
            this.quizId = this.quiz.getId();
        }
    }

    @PrePersist
    protected void onCreate() {
        takenAt = new Date();
    }
}
