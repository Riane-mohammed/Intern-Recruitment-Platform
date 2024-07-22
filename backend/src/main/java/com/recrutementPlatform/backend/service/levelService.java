package com.recrutementPlatform.backend.service;

import com.recrutementPlatform.backend.model.level;
import com.recrutementPlatform.backend.repository.levelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class levelService {

    @Autowired
    private levelRepository levelRepo;

    public List<level> getAllLevels() {
        return levelRepo.findAll();
    }
}
