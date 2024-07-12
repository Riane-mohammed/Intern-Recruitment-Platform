package com.recrutementPlatform.backend.controller;

import com.recrutementPlatform.backend.service.questionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/question")
public class questionController {

    @Autowired
    private questionService service;

}
