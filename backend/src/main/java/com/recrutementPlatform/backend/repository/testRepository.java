package com.recrutementPlatform.backend.repository;

import com.recrutementPlatform.backend.model.level;
import com.recrutementPlatform.backend.model.test;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface testRepository extends JpaRepository<test,Long> {

    @Query("SELECT COUNT(t) FROM test t WHERE t.level = :level")
    long countByLevel(@Param("level") level level);

}
