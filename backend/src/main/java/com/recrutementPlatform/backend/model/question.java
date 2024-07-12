package com.recrutementPlatform.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.recrutementPlatform.backend.enums.questionType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String question;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private questionType type;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date created_at;

    @OneToMany(mappedBy = "question")
    @JsonManagedReference
    private List<answer> answers;

    @ManyToOne
    @JoinColumn(name = "test_id")
    @JsonBackReference
    private test test;

    //Constructor
    public question(String question, questionType type) {
        this.question = question;
        this.type = type;
    }

    @PrePersist
    protected void onCreate() {
        created_at = new Date();
    }

}
