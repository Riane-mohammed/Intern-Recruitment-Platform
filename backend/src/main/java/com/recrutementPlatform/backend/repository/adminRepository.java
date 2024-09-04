package com.recrutementPlatform.backend.repository;

import com.recrutementPlatform.backend.model.admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface adminRepository extends JpaRepository<admin, Long> {

    Optional<admin> findByUsername(String username);
    Optional<admin> findByEmail(String email);

    @Query("SELECT a.username FROM admin a")
    List<String> findAllUsernames();

    @Query("SELECT a.email FROM admin a")
    List<String> findAllEmails();

    @Query("SELECT a FROM admin a WHERE a.id != 1 ")
    List<admin> findAllAdmins();
}
