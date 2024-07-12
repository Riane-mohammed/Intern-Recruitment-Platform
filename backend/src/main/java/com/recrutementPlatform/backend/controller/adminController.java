package com.recrutementPlatform.backend.controller;

import com.recrutementPlatform.backend.service.adminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/admin")
public class adminController {

    @Autowired
    private adminService service;

}
