package com.recrutementPlatform.backend.repository;

import com.recrutementPlatform.backend.model.answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface answerRepository extends JpaRepository<answer, Long> {
}
