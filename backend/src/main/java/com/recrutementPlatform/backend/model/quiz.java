package com.recrutementPlatform.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
public class quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String title;

    @Column
    private String description;

    @Column(nullable = false)
    private String emails;

    @Column(name = "created_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @OneToMany(mappedBy = "quiz", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<quizTest> quizTests = new ArrayList<>();

    @OneToMany(mappedBy = "quiz")
    @JsonBackReference
    private List<result> results;

    @OneToMany(mappedBy = "quiz")
    @JsonBackReference
    private List<token> tokens;

    @ManyToMany(mappedBy = "quizzes")
    @JsonManagedReference
    private List<candidate> candidates = new ArrayList<>();


    @PrePersist
    protected void onCreate() {
        createdAt = new Date();
    }
}

