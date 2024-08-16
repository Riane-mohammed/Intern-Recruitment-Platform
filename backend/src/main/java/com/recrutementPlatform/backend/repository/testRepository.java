package com.recrutementPlatform.backend.repository;

import com.recrutementPlatform.backend.model.level;
import com.recrutementPlatform.backend.model.test;
import com.recrutementPlatform.backend.model.testSection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface testRepository extends JpaRepository<test,Long> {
}
