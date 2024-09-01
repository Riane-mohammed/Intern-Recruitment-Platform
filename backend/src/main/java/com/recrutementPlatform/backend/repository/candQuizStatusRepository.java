package com.recrutementPlatform.backend.repository;

import com.recrutementPlatform.backend.model.candidate;
import com.recrutementPlatform.backend.model.candidateQuizStatus;
import com.recrutementPlatform.backend.model.quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface candQuizStatusRepository extends JpaRepository<candidateQuizStatus, Long> {

    @Query("SELECT COUNT(cq) FROM candidateQuizStatus cq WHERE cq.accepted = :accepted")
    long countNumberOfCandQuizStatus(@Param("accepted") boolean accepted);

    List<candidateQuizStatus> findByQuizAndCandidate(quiz quiz, candidate candidate);
}
