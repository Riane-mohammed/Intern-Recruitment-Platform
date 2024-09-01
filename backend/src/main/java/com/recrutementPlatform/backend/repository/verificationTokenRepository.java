package com.recrutementPlatform.backend.repository;

import com.recrutementPlatform.backend.model.admin;
import com.recrutementPlatform.backend.model.verificationToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface verificationTokenRepository extends JpaRepository<verificationToken, Long> {
    Optional<verificationToken> findByToken(String token);
    Optional<verificationToken> findByAdmin(admin admin);
}
