package com.recrutementPlatform.backend.controller;

import com.recrutementPlatform.backend.util.FileUploadUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/file")
public class FileController {

    @PostMapping("/uploadQuestion")
    public ResponseEntity<String> uploadQuestionImage(@RequestParam("image") MultipartFile file) {
        try {
            String fileUrl = FileUploadUtil.saveFile(file, "questions");
            return new ResponseEntity<>(fileUrl, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("File upload failed!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/uploadAnswer")
    public ResponseEntity<String> uploadAnswerImage(@RequestParam("image") MultipartFile file) {
        try {
            String fileUrl = FileUploadUtil.saveFile(file, "answers");
            return new ResponseEntity<>(fileUrl, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("File upload failed!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

