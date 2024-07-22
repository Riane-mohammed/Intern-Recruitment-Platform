package com.recrutementPlatform.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class test {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique=true, nullable=false)
    private String title;

    @Column(nullable = false)
    private int duration;

    @Column(name = "question_nbr", nullable = false)
    private int nbrQst;

    @ManyToOne
    @JoinColumn(name = "level_id")
    private level level;

    @ManyToOne
    @JoinColumn(name = "section_id")
    private testSection section;

    @ManyToMany(mappedBy = "tests")
    @JsonIgnore
    private List<quiz> quizzes;

    @OneToMany(mappedBy = "test")
    @JsonIgnore
    private List<result> results;

    @OneToMany(mappedBy = "test")
    @JsonManagedReference
    private List<question> questions;

}
