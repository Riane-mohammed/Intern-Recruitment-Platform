package com.recrutementPlatform.backend.repository;

import com.recrutementPlatform.backend.model.question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface questionRepository extends JpaRepository<question, Long> {
}
