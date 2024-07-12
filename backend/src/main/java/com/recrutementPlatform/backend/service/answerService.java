package com.recrutementPlatform.backend.service;

import com.recrutementPlatform.backend.repository.answerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class answerService {

    @Autowired
    private answerRepository answerRepo; ;
}
