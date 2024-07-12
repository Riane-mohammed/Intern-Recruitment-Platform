package com.recrutementPlatform.backend.service;

import com.recrutementPlatform.backend.repository.adminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class adminService {

    @Autowired
    private adminRepository adminRepo;

}
