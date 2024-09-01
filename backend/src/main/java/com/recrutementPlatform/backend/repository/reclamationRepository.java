package com.recrutementPlatform.backend.repository;

import com.recrutementPlatform.backend.model.reclamation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface reclamationRepository extends JpaRepository<reclamation, Long> {

    @Query("SELECT COUNT(r) FROM reclamation r WHERE r.status = :status")
    long countReclamationByStatus(@Param("status") boolean status);
}
