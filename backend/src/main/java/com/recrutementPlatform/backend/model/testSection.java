package com.recrutementPlatform.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    //constructor
}

