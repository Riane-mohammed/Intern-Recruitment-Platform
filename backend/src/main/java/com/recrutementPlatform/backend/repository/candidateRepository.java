package com.recrutementPlatform.backend.repository;

import com.recrutementPlatform.backend.enums.candidateGender;
import com.recrutementPlatform.backend.model.candidate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface candidateRepository extends JpaRepository<candidate, String> {

    @Query("SELECT COUNT(cand) FROM candidate cand WHERE cand.gender = :gender")
    long countNumberofgenders(@Param("gender") candidateGender gender);

    Optional<candidate> findByEmail(String email);
    void deleteByEmailIn(List<String> emails);
}
