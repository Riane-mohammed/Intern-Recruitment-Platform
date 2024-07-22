package com.recrutementPlatform.backend.controller;

import com.recrutementPlatform.backend.dto.resultDTO;
import com.recrutementPlatform.backend.model.result;
import com.recrutementPlatform.backend.service.resultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/result")
public class resultController {

    @Autowired
    private resultService service;

    @GetMapping
    public List<result> getResult() {
        return service.getAllResults();
    }

    @PostMapping("/addResult")
    public result addResult(@RequestBody resultDTO result) {
        if (result != null){
            return service.addResult(result);
        }

        throw new IllegalArgumentException("Result is null");
    }

}
