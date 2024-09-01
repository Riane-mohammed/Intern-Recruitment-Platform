package com.recrutementPlatform.backend.repository;

import com.recrutementPlatform.backend.model.quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface quizRepository extends JpaRepository<quiz, Long> {

    Optional<quiz> findByTitle(String title);

    Optional<quiz> findTopByOrderByIdDesc();

    @Modifying
    @Query(value = "DELETE FROM candidate_quiz WHERE quiz_id = :quizId", nativeQuery = true)
    void deleteCandidateQuizAssociationsByQuizId(@Param("quizId") Long quizId);
}
