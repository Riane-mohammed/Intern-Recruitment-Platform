package com.recrutementPlatform.backend.service;

import com.recrutementPlatform.backend.model.testSection;
import com.recrutementPlatform.backend.repository.sectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class sectionService {

    @Autowired
    private sectionRepository sectionRepo;

    public List<testSection> getAllSections(){
        return sectionRepo.findAll();
    }
}
