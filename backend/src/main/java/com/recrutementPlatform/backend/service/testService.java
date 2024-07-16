package com.recrutementPlatform.backend.service;

import com.recrutementPlatform.backend.dto.testDTO;
import com.recrutementPlatform.backend.model.test;
import com.recrutementPlatform.backend.model.testSection;
import com.recrutementPlatform.backend.repository.sectionRepository;
import com.recrutementPlatform.backend.repository.testRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class testService {

    @Autowired
    private testRepository testRepo;

    @Autowired
    private sectionRepository sectionRepo;


    public List<test> getAllTests(){
        return testRepo.findAll();
    }

    @Transactional
    public test addTest(testDTO test){
        Optional<testSection> optionalTestSection = sectionRepo.findById(test.getSectionId());
        if(optionalTestSection.isPresent()){
            testSection section = optionalTestSection.get();

            test newTest= new test();
            newTest.setTitle(test.getTitle());
            newTest.setDuration(test.getDuration());
            newTest.setNbrQst(test.getNbrQst());
            newTest.setSection(section);

            testRepo.save(newTest);

            return newTest;
        } else {
            throw new IllegalArgumentException("Section not found for ID: " + test.getSectionId());
        }
    }
}
