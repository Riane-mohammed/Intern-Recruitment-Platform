package com.recrutementPlatform.backend.service;

import com.recrutementPlatform.backend.dto.quizTestDTO;
import com.recrutementPlatform.backend.dto.quizDTO;
import com.recrutementPlatform.backend.model.quizTest;
import com.recrutementPlatform.backend.model.quiz;
import com.recrutementPlatform.backend.model.test;
import com.recrutementPlatform.backend.model.token;
import com.recrutementPlatform.backend.repository.quizRepository;
import com.recrutementPlatform.backend.repository.testRepository;
import com.recrutementPlatform.backend.repository.tokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import static com.recrutementPlatform.backend.util.stringUtil.splitEmails;

@Service
public class quizService {

    @Autowired
    private quizRepository quizRepo;

    @Autowired
    private testRepository testRepo;

    @Autowired
    private tokenRepository tokenRepo;

    @Autowired
    private emailService emailService;

    public List<quiz> getAllQuizzes() {
        return quizRepo.findAll();
    }

    @Transactional
    public quiz addQuiz(quizDTO quizDTO) {
        // Create new quiz instance
        quiz newQuiz = new quiz();
        newQuiz.setTitle(quizDTO.getTitle());
        newQuiz.setDescription(quizDTO.getDescription());
        newQuiz.setEmails(quizDTO.getEmails());
        newQuiz.setQuizTests(new ArrayList<>());

        // Loop through each QuizTestDTO and create quizTest entities
        for (quizTestDTO quizTestDTO : quizDTO.getQuizTests()) {
            // Find the associated test entity
            test associatedTest = testRepo.findById(quizTestDTO.getTestId())
                    .orElseThrow(() -> new RuntimeException("Test not found with id: " + quizTestDTO.getTestId()));

            // Create new quizTest instance
            quizTest newQuizTest = new quizTest();
            newQuizTest.setTest(associatedTest);
            newQuizTest.setQuiz(newQuiz); // Set reference to the new quiz
            newQuizTest.setPercentage(quizTestDTO.getPercentage());

            // Add quizTest to the quiz
            newQuiz.getQuizTests().add(newQuizTest);
        }

        // Save the quiz and associated quizTests
        newQuiz = quizRepo.save(newQuiz);

        // Send emails to candidates
        List<String> candidateEmails = splitEmails(newQuiz.getEmails());
        for (String email : candidateEmails) {
            // Generate token
            token newToken = new token();
            newToken.setValue(UUID.randomUUID().toString());
            newToken.setEmail(email);
            newToken.setQuiz(newQuiz);
            newToken.setExpirationDate(new Date(System.currentTimeMillis() + 24L * 60 * 60 * 1000 * quizDTO.getDuration()));

            // Save token in the database
            token savedToken = tokenRepo.save(newToken);

            // Send email with token link
            String tokenLink = generateLink() + savedToken.getValue();
            sendTokenLink(email, tokenLink, quizDTO.getDuration());
        }

        return newQuiz;
    }


    @Transactional
    public void deleteQuizzesByIds(List<Long> quizIds) {
        if (quizIds != null && !quizIds.isEmpty()) {
            try {
                for (Long id : quizIds) {
                    quiz existingQuiz = quizRepo.findById(id)
                            .orElseThrow(() -> new RuntimeException("Quiz not found with id: " + id));
                    quizRepo.delete(existingQuiz);
                }
                System.out.println("Successfully deleted quizzes with ids: " + quizIds);
            } catch (Exception e) {
                System.err.println("Failed to delete quizzes: " + e.getMessage());
                throw e;
            }
        } else {
            throw new IllegalArgumentException("Quiz IDs list is null or empty");
        }
    }


    public String generateLink() {
        return "http://localhost:3000/espace-quiz/token=";
    }

    public void sendTokenLink(String to, String link, int duration) {
        String subject = "Invitation à passer un test de recrutement";
        String body = "Bonjour,\n\n" +
                "Vous avez été sélectionné pour passer un test de recrutement dans le cadre de notre processus de sélection. " +
                "Veuillez cliquer sur le lien ci-dessous pour accéder au test. Ce lien est valable pendant "+ duration +" jours.\n\n" +
                link + "\n\n" +
                "Nous vous remercions de l'intérêt que vous portez à notre entreprise et nous vous souhaitons bonne chance pour votre test.\n\n" +
                "Cordialement,\n" +
                "L'équipe de recrutement";

        emailService.sendMail(to, subject, body);
    }


}
