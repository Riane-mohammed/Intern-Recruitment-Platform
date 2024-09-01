package com.recrutementPlatform.backend.service;

import com.recrutementPlatform.backend.dto.testDTO;
import com.recrutementPlatform.backend.model.*;
import com.recrutementPlatform.backend.repository.levelRepository;
import com.recrutementPlatform.backend.repository.questionRepository;
import com.recrutementPlatform.backend.repository.sectionRepository;
import com.recrutementPlatform.backend.repository.testRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class testService {

    @Autowired
    private testRepository testRepo;

    @Autowired
    private questionRepository questionRepo;

    @Autowired
    private sectionRepository sectionRepo;

    @Autowired
    private levelRepository levelRepo;


    public List<test> getAllTests(){
        return testRepo.findAll();
    }

    public test getTestById(Long id) {
        test testById = testRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Test not found"));
        return testById;
    }

    public Long getNumberOfTests(){
        return testRepo.count();
    }

    public Long getNumberOfTestsByLevel(level levelEntity){
        return testRepo.countByLevel(levelEntity);
    }

    @Transactional
    public test addOrUpdateTest(testDTO testDetails){
        // Find or create the test
        test test;
        if (testDetails.getId() != null) {
            test = testRepo.findById(testDetails.getId())
                    .orElseThrow(() -> new RuntimeException("Test not found"));
            if (test.getQuestions() == null) {
                test.setQuestions(new ArrayList<>());
            }
            test.getQuestions().clear();
        } else {
            test = new test();
            test.setQuestions(new ArrayList<>());
        }

        testSection section = sectionRepo.findById(testDetails.getSectionId())
                .orElseThrow(() -> new RuntimeException("Section not found"));

        level level = levelRepo.findById(testDetails.getLevelId())
                .orElseThrow(() -> new RuntimeException("Level not found"));

        // Update test properties
        test.setTitle(testDetails.getTitle());
        test.setSection(section);
        test.setLevel(level);

        // Convert the list of answerDTOs to a list of answer entities

        // Convert the list of questionDTOs to a list of question entities
        List<question> newQuestions = testDetails.getQuestions().stream().map(questionDTO -> {
            question newQuestion = new question();

            newQuestion.setQuestion(questionDTO.getQuestion());
            newQuestion.setImage(questionDTO.getImage());
            newQuestion.setType(questionDTO.getType());
            newQuestion.setPoint(questionDTO.getPoint());

            // Associate the question with the test
            newQuestion.setTest(test);

            // Convert answerDTOs to answer entities and associate them with the question
            List<answer> answers = questionDTO.getAnswers().stream().map(answerDTO -> {
                answer newAnswer = new answer();
                newAnswer.setAnswer(answerDTO.getAnswer());
                newAnswer.setImage(answerDTO.getImage());
                newAnswer.setCorrect(answerDTO.isCorrect());
                newAnswer.setQuestion(newQuestion);
                return newAnswer;
            }).collect(Collectors.toList());

            // Set the answers to the question
            newQuestion.setAnswers(answers);

            return newQuestion;
        }).collect(Collectors.toList());

        // Save all new questions to the repository
        questionRepo.saveAll(newQuestions);

        // Add new questions to the test
        test.getQuestions().addAll(newQuestions);

        // Save the question with the new answers
        testRepo.save(test);

        return test;
    }

    @Transactional
    public void deleteTestsByIds(List<Long> ids) {
        if (ids != null && !ids.isEmpty()) {
            try {
                for (Long id : ids) {
                    testRepo.deleteById(id);
                }
                System.out.println("Successfully deleted tests with ids: " + ids);
            } catch (Exception e) {
                System.err.println("Failed to delete test ids: " + e.getMessage());
                throw e;
            }
        } else {
            throw new IllegalArgumentException("ids list is null or empty");
        }
    }

}
