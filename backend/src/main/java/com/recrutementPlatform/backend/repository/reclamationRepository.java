package com.recrutementPlatform.backend.repository;

import com.recrutementPlatform.backend.model.reclamation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface reclamationRepository extends JpaRepository<reclamation, Long> {
}
