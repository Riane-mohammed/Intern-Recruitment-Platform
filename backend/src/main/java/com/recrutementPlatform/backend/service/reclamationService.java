package com.recrutementPlatform.backend.service;

import com.recrutementPlatform.backend.dto.reclamationDTO;
import com.recrutementPlatform.backend.dto.reclamationResponseDTO;
import com.recrutementPlatform.backend.model.reclamation;
import com.recrutementPlatform.backend.repository.reclamationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class reclamationService {

    @Autowired
    private reclamationRepository reclamationRepo;

    @Autowired
    private emailService emailService;

    public List<reclamation> getAllReclamation() {
        return reclamationRepo.findAll();
    }

    public Long getNumberOfReclamation() {
        return reclamationRepo.count();
    }

    public long countTrueReclamations() {
        return reclamationRepo.countReclamationByStatus(true);
    }

    public long countFalseReclamations() {
        return reclamationRepo.countReclamationByStatus(false);
    }

    @Transactional
    public reclamation addReclamation(reclamationDTO reclamationDTO) {
        reclamation reclamation = new reclamation();

        reclamation.setName(reclamationDTO.getName());
        reclamation.setEmail(reclamationDTO.getEmail());
        reclamation.setMessage(reclamationDTO.getMessage());
        reclamation.setStatus(false);

        return reclamationRepo.save(reclamation);
    }

    @Transactional
    public void deleteReclamationByIds(List<Long> ids) {
        if (ids != null && !ids.isEmpty()) {
            try {
                for (Long id : ids) {
                    reclamation reclamation = reclamationRepo.findById(id)
                            .orElseThrow(() -> new RuntimeException("Reclamation not found with id: " + id));

                    reclamationRepo.delete(reclamation);
                }
                System.out.println("Successfully deleted ReclamationS with ids: " + ids);
            } catch (Exception e) {
                System.err.println("Failed to delete ReclamationS: " + e.getMessage());
                throw e;
            }
        } else {
            throw new IllegalArgumentException("Reclamation IDs list is null or empty");
        }
    }

    @Transactional
    public reclamation reclamationResponse(reclamationResponseDTO response) {
        reclamation reclamation = reclamationRepo.findById(response.getReclamationId())
                .orElseThrow(() -> new RuntimeException("Reclamation not found with id: " + response.getReclamationId()));

        emailService.sendMail(reclamation.getEmail(), response.getSubject(), response.getResponse());
        reclamation.setStatus(true);

        reclamationRepo.save(reclamation);

        return reclamation;
    }

}
