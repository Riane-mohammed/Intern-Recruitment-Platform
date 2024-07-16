package com.recrutementPlatform.backend.config;

import com.recrutementPlatform.backend.model.level;
import com.recrutementPlatform.backend.repository.levelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class levelConfig {

    @Autowired
    private levelRepository levelRepo;

    @Bean
    public CommandLineRunner initDefaultLevel(){
        return args -> {
            if(levelRepo.count()==0){
                level Beginner = new level("Débutant");
                level Intermediate = new level("Intermédiaire");
                level Advanced = new level("Avancé");

                levelRepo.saveAll(
                        List.of(Beginner, Intermediate, Advanced)
                );
            }
        };
    }
}
