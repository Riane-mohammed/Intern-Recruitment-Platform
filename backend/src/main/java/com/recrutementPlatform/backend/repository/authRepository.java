package com.recrutementPlatform.backend.repository;

import com.recrutementPlatform.backend.model.admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface authRepository extends JpaRepository<admin, Long> {
    Optional<admin> findByEmail(String email);
}
