package com.recrutementPlatform.backend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "Section")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class testSection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String name;

    @Column(nullable = false, length = 50)
    private String description;

    @OneToMany(mappedBy = "section")
    @JsonManagedReference
    private List<test> tests;

}

