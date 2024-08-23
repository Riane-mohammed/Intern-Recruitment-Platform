package com.recrutementPlatform.backend.service;

import com.recrutementPlatform.backend.dto.questionDTO;
import com.recrutementPlatform.backend.model.answer;
import com.recrutementPlatform.backend.model.question;
import com.recrutementPlatform.backend.model.test;
import com.recrutementPlatform.backend.repository.answerRepository;
import com.recrutementPlatform.backend.repository.questionRepository;
import com.recrutementPlatform.backend.repository.testRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class questionService {

    @Autowired
    private questionRepository questionRepo;

    @Autowired
    private testRepository testRepo;

    @Autowired
    private answerRepository answerRepo;

    public List<question> getAllQuestions(){
        return questionRepo.findAll();
    }

    @Transactional
    public question addOrUpdateQuestion(questionDTO questionDTO) {
        // Find or create the question
        question question;
        if (questionDTO.getId() != null) {
            question = questionRepo.findById(questionDTO.getId())
                    .orElseThrow(() -> new RuntimeException("Question not found"));
            if (question.getAnswers() == null) {
                question.setAnswers(new ArrayList<>()); // Initialize if null
            }
            question.getAnswers().clear();
        } else {
            question = new question();
            question.setAnswers(new ArrayList<>()); // Initialize for new question
        }

        // Update question properties
        question.setQuestion(questionDTO.getQuestion());
        question.setImage(questionDTO.getImage());
        question.setType(questionDTO.getType());
        question.setPoint(questionDTO.getPoint());

        // Find the test by testId and associate it with the question
        test test = testRepo.findById(questionDTO.getTestId())
                .orElseThrow(() -> new RuntimeException("Test not found"));

        question.setTest(test);

        // Convert the list of answerDTOs to a list of answer entities
        List<answer> newAnswers = questionDTO.getAnswers().stream().map(answerDTO -> {
            answer newAnswer = new answer();
            newAnswer.setAnswer(answerDTO.getAnswer());
            newAnswer.setImage(answerDTO.getImage());
            newAnswer.setCorrect(answerDTO.isCorrect());
            newAnswer.setQuestion(question); // Set the question for the new answer
            return newAnswer;
        }).collect(Collectors.toList());

        // Save all new answers to the repository
        answerRepo.saveAll(newAnswers);

        // Add new answers to the question
        question.getAnswers().addAll(newAnswers);

        // Save the question with the new answers
        questionRepo.save(question);

        return question;
    }

    @Transactional
    public void deleteQuestionsByIds(List<Long> ids) {
        if (ids != null && !ids.isEmpty()) {
            try {
                for (Long id : ids) {
                    questionRepo.deleteById(id);
                }
                System.out.println("Successfully deleted questions with ids: " + ids);
            } catch (Exception e) {
                System.err.println("Failed to delete ids: " + e.getMessage());
                throw e;
            }
        } else {
            throw new IllegalArgumentException("ids list is null or empty");
        }
    }


}
