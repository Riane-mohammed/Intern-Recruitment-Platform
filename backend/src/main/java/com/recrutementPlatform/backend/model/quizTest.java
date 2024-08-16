package com.recrutementPlatform.backend.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "quiz_test")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class quizTest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "quiz_id", nullable = false)
    private quiz quiz;

    @ManyToOne
    @JoinColumn(name = "test_id", nullable = false)
    private test test;

    @Column(nullable = false)
    private double percentage;

}
