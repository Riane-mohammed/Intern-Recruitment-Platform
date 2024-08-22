package com.recrutementPlatform.backend.service;

import com.recrutementPlatform.backend.dto.sectionDTO;
import com.recrutementPlatform.backend.model.reclamation;
import com.recrutementPlatform.backend.model.testSection;
import com.recrutementPlatform.backend.repository.sectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class sectionService {

    @Autowired
    private sectionRepository sectionRepo;

    public List<testSection> getAllSections(){
        return sectionRepo.findAll();
    }

    public testSection getSectionById(Long id){
        testSection section = sectionRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("section with id " + id + " not found"));

        return section;
    }

    @Transactional
    public testSection addSection(sectionDTO section){
        Optional<testSection> sectionOptional = sectionRepo.findByName(section.getName());

        if(sectionOptional.isPresent()){
            throw new RuntimeException("section with name " + section.getName() + " already exists");
        }

        testSection newSection = new testSection();

        newSection.setName(section.getName());
        newSection.setDescription(section.getDescription());

        sectionRepo.save(newSection);

        return newSection;
    }

    @Transactional
    public testSection updateSection(Long id, sectionDTO sectionDTO){
        testSection section = sectionRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("section with id " + id + " not found"));

        section.setName(sectionDTO.getName());
        section.setDescription(sectionDTO.getDescription());

        sectionRepo.save(section);

        return section;
    }

    @Transactional
    public void deleteSectionsId(List<Long> ids) {
        if (ids != null && !ids.isEmpty()) {
            try {
                for (Long id : ids) {
                    testSection section = sectionRepo.findById(id)
                            .orElseThrow(() -> new RuntimeException("Section not found with id: " + id));

                    sectionRepo.delete(section);
                }
                System.out.println("Successfully deleted Sections with ids: " + ids);
            } catch (Exception e) {
                System.err.println("Failed to delete Sections: " + e.getMessage());
                throw e;
            }
        } else {
            throw new IllegalArgumentException("Section IDs list is null or empty");
        }
    }



}
