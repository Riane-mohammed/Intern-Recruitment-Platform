package com.recrutementPlatform.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class candidateQuizStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "quiz_id", nullable = false)
    @JsonIgnore
    private quiz quiz;

    @ManyToOne
    @JoinColumn(name = "candidate_id", nullable = false)
    @JsonIgnore
    private candidate candidate;

    @Column(nullable = false)
    private boolean accepted = false;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "accepted_at")
    private Date acceptedAt;

    @Transient
    private Long quizId;

    @Transient
    private String candidateId;

    @PostLoad
    private void setIds() {
        if (this.candidate != null) {
            this.candidateId = this.candidate.getEmail();
        }
        if (this.quiz != null) {
            this.quizId = this.quiz.getId();
        }
    }

    @PrePersist
    protected void onCreate() {
        acceptedAt = new Date();
    }

    public candidateQuizStatus(quiz quiz, candidate candidate) {
        this.quiz = quiz;
        this.candidate = candidate;
        this.accepted = false;
    }
}
