package com.recrutementPlatform.backend.service;

import com.recrutementPlatform.backend.dto.adminDTO;
import com.recrutementPlatform.backend.dto.adminUpdateDTO;
import com.recrutementPlatform.backend.model.admin;
import com.recrutementPlatform.backend.model.passwordVerification;
import com.recrutementPlatform.backend.model.quiz;
import com.recrutementPlatform.backend.model.verificationToken;
import com.recrutementPlatform.backend.repository.adminRepository;
import com.recrutementPlatform.backend.repository.passwordVerificationRepository;
import com.recrutementPlatform.backend.repository.verificationTokenRepository;
import com.recrutementPlatform.backend.util.passwordUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class adminService {

    @Autowired
    private adminRepository adminRepo;

    @Autowired
    private verificationTokenRepository tokenRepo;

    @Autowired
    private emailService emailService;

    @Autowired
    private passwordVerificationRepository passwordVerificationRepo;

    @Value("${app.base.url}")
    private String baseUrl;


    public admin addAdmin(adminDTO adminDTO) {
        Optional<admin> existingAdmin = adminRepo.findByUsername(adminDTO.getUsername());

        if (existingAdmin.isPresent()) {
            throw new RuntimeException("Admin already exists");
        }

        admin newAdmin = new admin();
        newAdmin.setUsername(adminDTO.getUsername());
        newAdmin.setEmail(adminDTO.getEmail());
        newAdmin.setPassword(passwordUtil.hashPassword(adminDTO.getPassword()));

        adminRepo.save(newAdmin);

        // Create a verification token
        String token = UUID.randomUUID().toString();
        verificationToken verificationToken = new verificationToken(
                newAdmin,
                token,
                LocalDateTime.now().plusHours(24) // Token valid for 24 hours
        );

        tokenRepo.save(verificationToken);

        // Send verification email
        String verificationUrl = baseUrl + "/Connexion/token=" + token;
        emailService.sendMail(
                newAdmin.getEmail(),
                "Vérifiez votre adresse e-mail",
                "Bonjour,\n\nVeuillez cliquer sur le lien suivant pour vérifier votre adresse e-mail : " + verificationUrl +
                        ".\n\nSi vous n'avez pas demandé cette vérification, veuillez ignorer ce message.\n\nMerci de votre compréhension.\n\nCordialement,\nL'équipe de PORTNET"
        );


        return newAdmin;
    }

    public void activateAdmin(admin admin) {
        admin.setActive(true);
        adminRepo.save(admin);
    }

    public void upgradeAdmin(Long id) {
        admin existingAdmin = adminRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Admin not found with id: " + id));
        existingAdmin.setSuperAdmin(true);
        adminRepo.save(existingAdmin);
    }

    public void downgradeAdmin(Long id) {
        admin existingAdmin = adminRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Admin not found with id: " + id));
        existingAdmin.setSuperAdmin(false);
        adminRepo.save(existingAdmin);
    }

    public admin updatePassword(admin admin, String password){
        admin.setPassword(passwordUtil.hashPassword(password));
        return adminRepo.save(admin);
    }

    @Transactional
    public void deleteAdminsByIds(List<Long> adminIds) {
        if (adminIds != null && !adminIds.isEmpty()) {
            try {
                for (Long id : adminIds) {
                    admin existingAdmin = adminRepo.findById(id)
                            .orElseThrow(() -> new RuntimeException("Admin not found with id: " + id));

                    Optional<passwordVerification> existingToken= passwordVerificationRepo.findByAdmin(existingAdmin);

                    Optional<verificationToken> existingVerification = tokenRepo.findByAdmin(existingAdmin);

                    if(existingToken.isPresent()){
                        passwordVerificationRepo.delete(existingToken.get());
                    }

                    if(existingVerification.isPresent()){
                        tokenRepo.delete(existingVerification.get());
                    }
                    
                    adminRepo.delete(existingAdmin);
                }
                System.out.println("Successfully deleted admins with ids: " + adminIds);
            } catch (Exception e) {
                System.err.println("Failed to delete admins: " + e.getMessage());
                throw e;
            }
        } else {
            throw new IllegalArgumentException("Admin IDs list is null or empty");
        }
    }

    public admin sendRecoveryLink(String email) {
        // Find the admin by email or throw an exception if not found
        admin admin = adminRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Admin avec l'email: " + email + " non trouvé"));

        Optional<passwordVerification> existingToken= passwordVerificationRepo.findByAdmin(admin);

        if(existingToken.isPresent()){
            passwordVerificationRepo.delete(existingToken.get());
        }

        // Create a recovery token
        String token = UUID.randomUUID().toString();
        passwordVerification verificationToken = new passwordVerification(
                admin,
                token,
                LocalDateTime.now().plusMinutes(10) // Token valid for 10 minutes
        );

        // Save the verification token (assuming you have a method to do so)
        passwordVerificationRepo.save(verificationToken);

        // Send recovery email
        String recoveryUrl = baseUrl + "/Réinitialiser-Mot-Passe/token=" + token;
        emailService.sendMail(
                admin.getEmail(),
                "Réinitialisation de votre mot de passe",
                "Bonjour " + admin.getUsername() + ",\n\n" +
                        "Nous avons reçu une demande de réinitialisation de votre mot de passe. " +
                        "Veuillez cliquer sur le lien ci-dessous pour définir un nouveau mot de passe :\n\n" +
                        recoveryUrl + "\n\n" +
                        "Ce lien est valable pendant 24 heures. Si vous n'avez pas demandé cette réinitialisation, " +
                        "merci de bien vouloir ignorer cet email ou de contacter notre support.\n\n" +
                        "Merci de votre confiance.\n\n" +
                        "Cordialement,\n" +
                        "L'équipe de [Votre Nom d'Entreprise]\n" +
                        "[Site Web de l'Entreprise]\n" +
                        "[Contact Support]"
        );

        return admin;
    }


    public admin updateAdmin(adminUpdateDTO adminDTO) {
        admin existingAdmin = adminRepo.findById(adminDTO.getId())
                .orElseThrow(() -> new RuntimeException("Admin avec l'ID: " + adminDTO.getId() + " non trouvé"));

        // Vérifier l'ancien mot de passe
        if (!passwordUtil.matches(adminDTO.getOldPassword(), existingAdmin.getPassword())) {
            throw new RuntimeException("L'ancien mot de passe est incorrect");
        }

        // Vérifier si le nouveau nom d'utilisateur existe déjà
        if (!existingAdmin.getUsername().equals(adminDTO.getUsername())) {
            Optional<admin> adminWithNewUsername = adminRepo.findByUsername(adminDTO.getUsername());
            if (adminWithNewUsername.isPresent()) {
                throw new RuntimeException("Le nom d'utilisateur " + adminDTO.getUsername() + " est déjà pris");
            }
        }

        // Hacher et définir le nouveau mot de passe
        existingAdmin.setUsername(adminDTO.getUsername());
        existingAdmin.setPassword(passwordUtil.hashPassword(adminDTO.getNewPassword()));

        adminRepo.save(existingAdmin);

        // Envoyer un e-mail de notification
        String subject = "Informations sur la mise à jour de votre compte";
        String text = "Bonjour,\n\n" +
                "Votre compte a été mis à jour avec succès.\n" +
                "Si vous n'avez pas effectué cette modification, veuillez nous contacter immédiatement.\n\n" +
                "Cordialement,\nL'équipe de Pornet";

        emailService.sendMail(existingAdmin.getEmail(), subject, text);

        return existingAdmin;
    }

    public List<admin> getAllAdmins() {
        return adminRepo.findAllAdmins();
    }

    public List<String> getAllUsernames() {
        return adminRepo.findAllUsernames();
    }

    public List<String> getAllEmails() {
        return adminRepo.findAllEmails();
    }
}
