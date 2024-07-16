package com.recrutementPlatform.backend.repository;

import com.recrutementPlatform.backend.model.candidate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface candidateRepository extends JpaRepository<candidate, String> {
}
