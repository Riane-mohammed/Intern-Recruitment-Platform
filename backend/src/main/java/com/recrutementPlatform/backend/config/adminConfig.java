package com.recrutementPlatform.backend.config;

import com.recrutementPlatform.backend.model.admin;
import com.recrutementPlatform.backend.repository.adminRepository;
import com.recrutementPlatform.backend.util.passwordUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class adminConfig {

    @Autowired
    private adminRepository adminRepo;

    @Bean
    public CommandLineRunner initDefaultAccount() {
        return args -> {
            if (adminRepo.count() == 0){
                admin defaultAccount = new admin("admin", "admin@gmail.com", passwordUtil.hashPassword("admin123"),true);
                adminRepo.save(defaultAccount);
            }
        };
    };
}
