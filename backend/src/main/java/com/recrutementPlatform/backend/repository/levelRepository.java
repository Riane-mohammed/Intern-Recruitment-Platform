package com.recrutementPlatform.backend.repository;

import com.recrutementPlatform.backend.model.level;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface levelRepository extends JpaRepository<level, Long> {

    Optional<level> findByName(String name);
}
