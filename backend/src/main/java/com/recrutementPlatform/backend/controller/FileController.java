package com.recrutementPlatform.backend.controller;

import com.recrutementPlatform.backend.util.FileUploadUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/file")
@CrossOrigin(origins = "http://localhost:3000")
public class FileController {

    private final FileUploadUtil fileUploadUtil;
    private final String uploadDir;

    public FileController(FileUploadUtil fileUploadUtil, @Value("${file.upload-dir}") String uploadDir) {
        this.fileUploadUtil = fileUploadUtil;
        this.uploadDir = uploadDir;
    }

    @PostMapping("/uploadQuestion")
    public ResponseEntity<Map<String, String>> uploadQuestionImage(@RequestParam("image") MultipartFile file) {
        try {
            String fileUrl = fileUploadUtil.saveFile(file, "questions");

            // Create a JSON-like response
            Map<String, String> response = new HashMap<>();
            response.put("path", fileUrl);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/uploadAnswer")
    public ResponseEntity<Map<String, String>> uploadAnswerImage(@RequestParam("image") MultipartFile file) {
        try {
            String fileUrl = fileUploadUtil.saveFile(file, "answers");

            // Create a JSON-like response
            Map<String, String> response = new HashMap<>();
            response.put("path", fileUrl);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Map<String, Object>> deleteImage(@RequestParam("path") String filePath) {
        Map<String, Object> response = new HashMap<>();

        try {
            // Assuming the path is relative to the root directory of your application
            String fullPath = uploadDir + filePath;
            boolean isDeleted = fileUploadUtil.deleteFile(fullPath);

            if (isDeleted) {
                response.put("status", "success");
                response.put("message", "File deleted successfully");
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                response.put("status", "failure");
                response.put("message", "File not found or could not be deleted");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            e.printStackTrace();
            response.put("status", "error");
            response.put("message", "Error deleting file");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
