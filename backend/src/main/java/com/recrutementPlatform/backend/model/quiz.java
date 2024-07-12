package com.recrutementPlatform.backend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique=true, nullable=false)
    private String title;

    @Column
    private String description;

    @Column(nullable = false)
    private String emails;

    @Column(name = "created_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @ManyToMany
    @JoinTable(
            name = "quiz_test",
            joinColumns = @JoinColumn(name = "quiz_id"),
            inverseJoinColumns = @JoinColumn(name = "test_id"))
    private List<test> tests;

    @OneToMany(mappedBy = "quiz")
    @JsonManagedReference
    private List<result> results;

    @OneToMany(mappedBy = "quiz")
    @JsonManagedReference
    private List<token> tokens;

}
