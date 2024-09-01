package com.recrutementPlatform.backend.repository;

import com.recrutementPlatform.backend.model.candidate;
import com.recrutementPlatform.backend.model.quiz;
import com.recrutementPlatform.backend.model.result;
import com.recrutementPlatform.backend.model.test;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface resultRepository extends JpaRepository<result, Long> {

    Optional<result> findByQuizAndTestAndCandidate(quiz quiz, test test, candidate candidate);

    List<result> findByQuiz(quiz quiz);

}
