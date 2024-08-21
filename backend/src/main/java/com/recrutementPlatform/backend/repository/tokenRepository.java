package com.recrutementPlatform.backend.repository;

import com.recrutementPlatform.backend.model.token;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface tokenRepository extends JpaRepository<token,Long> {
    Optional<token> findByValue(String value);
}
