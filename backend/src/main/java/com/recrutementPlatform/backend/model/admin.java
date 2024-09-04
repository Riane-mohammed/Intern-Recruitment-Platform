package com.recrutementPlatform.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private boolean active = false;

    @Column(nullable = false)
    private boolean superAdmin = false;

    //constructor
    public admin(String username, String email, String password, boolean active, boolean superUser) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.active = active;
        this.superAdmin = superUser;
    }
}
