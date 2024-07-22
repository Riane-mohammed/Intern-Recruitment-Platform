package com.recrutementPlatform.backend.repository;

import com.recrutementPlatform.backend.model.quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface quizRepository extends JpaRepository<quiz, Long> {

    Optional<quiz> findByTitle(String title);

}
