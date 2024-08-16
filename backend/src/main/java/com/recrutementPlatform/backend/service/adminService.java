package com.recrutementPlatform.backend.service;

import com.recrutementPlatform.backend.model.admin;
import com.recrutementPlatform.backend.util.passwordUtil;
import com.recrutementPlatform.backend.repository.adminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class adminService {

    @Autowired
    private adminRepository adminRepo;

}
