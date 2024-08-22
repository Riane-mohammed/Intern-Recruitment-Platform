package com.recrutementPlatform.backend.service;

import com.recrutementPlatform.backend.dto.sectionDTO;
import com.recrutementPlatform.backend.model.level;
import com.recrutementPlatform.backend.model.testSection;
import com.recrutementPlatform.backend.repository.levelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class levelService {

    @Autowired
    private levelRepository levelRepo;

    public List<level> getAllLevels() {
        return levelRepo.findAll();
    }

    public level getLevelById(Long id){
        level level = levelRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("level with id " + id + " not found"));

        return level;
    }

    @Transactional
    public level addLevel(String name){
        Optional<level> levelOptional = levelRepo.findByName(name);

        if(levelOptional.isPresent()){
            throw new RuntimeException("level with name " + name + " already exists");
        }

        level newLevel = new level(name);

        levelRepo.save(newLevel);

        return newLevel;
    }

    @Transactional
    public level updatelevel(Long id, String name){
        level level = levelRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("level with id " + id + " not found"));

        level.setName(name);

        levelRepo.save(level);

        return level;
    }

    @Transactional
    public void deleteLevelsId(List<Long> ids) {
        if (ids != null && !ids.isEmpty()) {
            try {
                for (Long id : ids) {
                    level level = levelRepo.findById(id)
                            .orElseThrow(() -> new RuntimeException("level not found with id: " + id));

                    levelRepo.delete(level);
                }
                System.out.println("Successfully deleted Levels with ids: " + ids);
            } catch (Exception e) {
                System.err.println("Failed to delete Levels: " + e.getMessage());
                throw e;
            }
        } else {
            throw new IllegalArgumentException("level IDs list is null or empty");
        }
    }
}
