package com.recrutementPlatform.backend.repository;

import com.recrutementPlatform.backend.model.testSection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface sectionRepository extends JpaRepository<testSection, Long> {
}
