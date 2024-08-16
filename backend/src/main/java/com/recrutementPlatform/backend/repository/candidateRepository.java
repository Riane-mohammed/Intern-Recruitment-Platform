package com.recrutementPlatform.backend.repository;

import com.recrutementPlatform.backend.model.candidate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface candidateRepository extends JpaRepository<candidate, String> {
    Optional<candidate> findByEmail(String email);

    void deleteByEmailIn(List<String> emails);
}
