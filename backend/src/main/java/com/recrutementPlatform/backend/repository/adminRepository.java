package com.recrutementPlatform.backend.repository;

import com.recrutementPlatform.backend.model.admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface adminRepository extends JpaRepository<admin, Long> {
}
