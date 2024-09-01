package com.recrutementPlatform.backend.service;

import com.recrutementPlatform.backend.dto.authDTO;
import com.recrutementPlatform.backend.model.admin;
import com.recrutementPlatform.backend.repository.authRepository;
import com.recrutementPlatform.backend.util.passwordUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class authService {

    @Autowired
    private authRepository authRepo;


    public admin login(authDTO user) {
        admin admin = authRepo.findByEmail(user.getEmail())
                .orElseThrow(() -> new RuntimeException("Admin with the email: " + user.getEmail() + " is not found"));

        // Check if the account is active
        if (!admin.isActive()) {
            throw new RuntimeException("The account is not activated. Please verify your email.");
        }

        // Validate the password
        if (passwordUtil.matches(user.getPassword(), admin.getPassword())) {
            return admin;
        } else {
            throw new RuntimeException("The password is not correct");
        }
    }
}
