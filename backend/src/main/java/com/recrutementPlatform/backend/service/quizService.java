package com.recrutementPlatform.backend.service;

import com.recrutementPlatform.backend.dto.quizDTO;
import com.recrutementPlatform.backend.util.stringUtil;
import com.recrutementPlatform.backend.model.quiz;
import com.recrutementPlatform.backend.model.test;
import com.recrutementPlatform.backend.repository.quizRepository;
import com.recrutementPlatform.backend.repository.testRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class quizService {

    @Autowired
    private quizRepository quizRepo;

    @Autowired
    private testRepository testRepo;

    @Autowired
    private emailService emailService;

    public List<quiz> getAllQuizzes() {
        return quizRepo.findAll();
    }

    @Transactional
    public quiz addQuiz(quizDTO quizDTO) {
        Optional<quiz> optionalQuiz = quizRepo.findByTitle(quizDTO.getTitle());

        if (optionalQuiz.isPresent()) {
            throw new IllegalArgumentException("Quiz with title " + quizDTO.getTitle() + " already exists.");
        }

        quiz newQuiz = new quiz();

        newQuiz.setTitle(quizDTO.getTitle());
        newQuiz.setDescription(quizDTO.getDescription());
        newQuiz.setEmails(quizDTO.getEmails());

        List<test> testList = quizDTO.getTestIds()
                .stream()
                .map(testId -> testRepo.findById(testId)
                        .orElseThrow(() -> new IllegalArgumentException("Test with ID " + testId + " not found")))
                        .collect(Collectors.toList());

        newQuiz.setTests(testList);

        List<String> emails = stringUtil.splitEmails(quizDTO.getEmails());

        emails.forEach(email -> sendTokenLink(email));

        quizRepo.save(newQuiz);

        return newQuiz;
    }

    public String generateLink() {
        return "google.com";
    }

    public void sendTokenLink(String to) {
        emailService.sendMail(to, "Entretien Portnet", "Bonjour, tu peux passer le test en utilisant ce lien : " + generateLink() + "\n ce lien est valable jusqu'a 24h");
    }

}
