package com.recrutementPlatform.backend.config;

import com.recrutementPlatform.backend.dto.sectionDTO;
import com.recrutementPlatform.backend.model.testSection;
import com.recrutementPlatform.backend.repository.sectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class sectionConfig {

    @Autowired
    private sectionRepository sectionRepo;

    @Bean
    public CommandLineRunner initDefaultSection(){
        return args -> {
            if(sectionRepo.count() == 0){
                sectionDTO section1 = new sectionDTO("Technique", " Évalue les compétences techniques et les capacités de résolution de problèmes pertinentes pour le poste.");
                sectionDTO section2 = new sectionDTO("Psychotechnique", "Évalue les capacités cognitives, les traits de personnalité et les comportements pour comprendre l'adéquation potentielle des candidats au sein de l'entreprise.");

                testSection testSec1 = new testSection();
                testSection testSec2 = new testSection();

                testSec1.setName(section1.getName());
                testSec2.setName(section2.getName());
                testSec1.setDescription(section1.getDescription());
                testSec2.setDescription(section2.getDescription());

                sectionRepo.saveAll(
                        List.of(testSec1, testSec2)
                );

            }
        };
    }
}
