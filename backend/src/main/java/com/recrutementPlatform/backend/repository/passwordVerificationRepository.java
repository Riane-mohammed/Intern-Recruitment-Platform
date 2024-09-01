package com.recrutementPlatform.backend.repository;

import com.recrutementPlatform.backend.model.admin;
import com.recrutementPlatform.backend.model.passwordVerification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface passwordVerificationRepository extends JpaRepository<passwordVerification, Long> {

    Optional<passwordVerification> findByToken(String token);
    Optional<passwordVerification> findByAdmin(admin admin);

}
