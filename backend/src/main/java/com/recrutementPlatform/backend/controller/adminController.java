package com.recrutementPlatform.backend.controller;

import com.recrutementPlatform.backend.dto.*;
import com.recrutementPlatform.backend.model.admin;
import com.recrutementPlatform.backend.model.passwordVerification;
import com.recrutementPlatform.backend.model.verificationToken;
import com.recrutementPlatform.backend.repository.passwordVerificationRepository;
import com.recrutementPlatform.backend.repository.verificationTokenRepository;
import com.recrutementPlatform.backend.service.adminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class adminController {

    @Autowired
    private verificationTokenRepository tokenRepo;

    @Autowired
    private passwordVerificationRepository passTokenRepo;

    @Autowired
    private adminService adminService;

    @PostMapping("/add")
    public admin addAdmin(@RequestBody adminDTO adminDTO) {
            return adminService.addAdmin(adminDTO);
    }

    @GetMapping("/usernames")
    public List<String> getAllUsernames() {
        return adminService.getAllUsernames();
    }

    @GetMapping("/all-admins")
    public List<admin> getAll() {
        return adminService.getAllAdmins();
    }

    @PutMapping("/update")
    public admin updateAdmin(@RequestBody adminUpdateDTO adminDTO) {
        return adminService.updateAdmin(adminDTO);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Map<String, Object>> deleteAdmins(@RequestBody List<Long> adminIds) {
        adminService.deleteAdminsByIds(adminIds);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Successfully deleted Admins");
        response.put("ids", adminIds);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/send-recovery-link")
    public ResponseEntity<Map<String, String>> sendRecoveryLink(@RequestBody emailObj email) {
        Map<String, String> response = new HashMap<>();

        try {
            adminService.sendRecoveryLink(email.getEmail());
            response.put("status", "success");
            response.put("message", "Un lien de réinitialisation du mot de passe a été envoyé à votre adresse e-mail.");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            response.put("status", "error");
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/verify-password")
    public boolean isPasswordTokenValid(@RequestBody verifyPassToken token) {
        Optional<passwordVerification> verificationToken = passTokenRepo.findByToken(token.getToken());

        // Check if the token is present and valid
        if (verificationToken.isPresent()) {
            passwordVerification tokenObj = verificationToken.get();
            // Check if the token has expired
            if (tokenObj.getExpiryDate().isBefore(LocalDateTime.now())) {
                return false; // Token is expired
            }
            return true; // Token is valid
        } else {
            return false; // Token not found
        }
    }

    @PutMapping("/update-password")
    public Map<String, Object> updatePassword(@RequestBody newPasswordDTO newPass) {
        Map<String, Object> response = new HashMap<>();

        Optional<passwordVerification> tokenOpt = passTokenRepo.findByToken(newPass.getToken());

        if (tokenOpt.isPresent()) {
            passwordVerification tokenObj = tokenOpt.get();

            // Check if the token has expired
            if (tokenObj.getExpiryDate().isAfter(LocalDateTime.now())) {
                admin admin = tokenObj.getAdmin();
                adminService.updatePassword(admin, newPass.getNewPassword());

                response.put("status", "success");
                response.put("message", "Password updated successfully");
                response.put("admin", admin);
            } else {
                response.put("status", "error");
                response.put("message", "Token expired");
            }
        } else {
            response.put("status", "error");
            response.put("message", "Invalid token");
        }

        return response;
    }


    @PostMapping("/verify-admin")
    public boolean verifyEmail(@RequestBody tokenRequestDTO request) {
        Optional<verificationToken> optionalToken = tokenRepo.findByToken(request.getToken());

        if (optionalToken.isEmpty()) {
            return false;
        }

        verificationToken tokenObj = optionalToken.get();

        if (tokenObj.getExpiryDate().isBefore(LocalDateTime.now())) {
            return false;
        }

        admin admin = tokenObj.getAdmin();
        adminService.activateAdmin(admin);

        tokenRepo.delete(tokenObj);

        return true;
    }


    public static class emailObj{
        public String email;

        public String getEmail() {
            return email;
        }
    }

}
