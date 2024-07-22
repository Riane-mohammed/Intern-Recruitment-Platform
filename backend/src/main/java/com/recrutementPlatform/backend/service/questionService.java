package com.recrutementPlatform.backend.service;

import com.recrutementPlatform.backend.dto.questionDTO;
import com.recrutementPlatform.backend.model.question;
import com.recrutementPlatform.backend.model.test;
import com.recrutementPlatform.backend.repository.questionRepository;
import com.recrutementPlatform.backend.repository.testRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class questionService {

    @Autowired
    private questionRepository questionRepo;

    @Autowired
    private testRepository testRepo;

    public List<question> getAllQuestions(){
        return questionRepo.findAll();
    }

    @Transactional
    public question addQuestion(questionDTO question){
        Optional<test> optionalTest = testRepo.findById(question.getTestId());
        if(optionalTest.isPresent()){
            test test = optionalTest.get();

            question newQuestion = new question();

            newQuestion.setQuestion(question.getQuestion());
            newQuestion.setType(question.getType());
            newQuestion.setTest(test);

            questionRepo.save(newQuestion);

            return newQuestion;
        }else {
            throw new IllegalArgumentException("Test id not found");
        }
    }

}
