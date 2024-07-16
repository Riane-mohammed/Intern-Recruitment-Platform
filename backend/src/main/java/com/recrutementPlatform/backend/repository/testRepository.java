package com.recrutementPlatform.backend.repository;

import com.recrutementPlatform.backend.model.test;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface testRepository extends JpaRepository<test,Long> {
}
