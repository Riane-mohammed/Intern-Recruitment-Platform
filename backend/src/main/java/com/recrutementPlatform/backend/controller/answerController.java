package com.recrutementPlatform.backend.controller;

import com.recrutementPlatform.backend.service.answerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/answer")
public class answerController {

    @Autowired
    private answerService service;

}
