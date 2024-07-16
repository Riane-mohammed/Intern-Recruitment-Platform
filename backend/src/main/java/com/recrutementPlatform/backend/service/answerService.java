package com.recrutementPlatform.backend.service;

import com.recrutementPlatform.backend.dto.answerDTO;
import com.recrutementPlatform.backend.model.answer;
import com.recrutementPlatform.backend.model.question;
import com.recrutementPlatform.backend.repository.answerRepository;
import com.recrutementPlatform.backend.repository.questionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class answerService {

    @Autowired
    private answerRepository answerRepo;

    @Autowired
    private questionRepository questionRepo;

    public List<answer> getAllAnswers() {
        return answerRepo.findAll();
    }

    @Transactional
    public answer AddAnswer(answerDTO answer) {
        Optional<question> optionalQuestion = questionRepo.findById(answer.getQuestionId());
        if(optionalQuestion.isPresent()) {
            question question = optionalQuestion.get();

            answer newAnswer = new answer();

            newAnswer.setAnswer(answer.getAnswer());
            newAnswer.setIsCorrect(answer.getIsCorrect());
            newAnswer.setQuestion(question);

            answerRepo.save(newAnswer);

            return newAnswer;
        }else {
            throw new IllegalArgumentException("Question not found");
        }
    }

}
