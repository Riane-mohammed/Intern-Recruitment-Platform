package com.recrutementPlatform.backend.service;

import com.recrutementPlatform.backend.repository.questionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class questionService {

    @Autowired
    private questionRepository questionRepo;

}
