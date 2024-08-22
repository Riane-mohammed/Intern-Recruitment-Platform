package com.recrutementPlatform.backend.service;

import com.recrutementPlatform.backend.model.answer;
import com.recrutementPlatform.backend.repository.answerRepository;
import com.recrutementPlatform.backend.repository.questionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class answerService {

    @Autowired
    private answerRepository answerRepo;

    @Autowired
    private questionRepository questionRepo;

    public List<answer> getAllAnswers() {
        return answerRepo.findAll();
    }

}
