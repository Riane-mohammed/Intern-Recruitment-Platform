package com.recrutementPlatform.backend.util;


import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

public class FileUploadUtil {

    private static final String BASE_UPLOAD_DIR = "C:/Users/user/Desktop/Intern Recruitment Platform/uploads/";

    public static String saveFile(MultipartFile file, String subFolder) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }

        // Generate a unique filename
        String uniqueFilename = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

        // Define the subfolder path (e.g., "questions" or "answers")
        Path uploadPath = Paths.get(BASE_UPLOAD_DIR + subFolder);
        createDirectoryIfNotExists(uploadPath);

        // Save the file
        Path filePath = uploadPath.resolve(uniqueFilename);
        Files.write(filePath, file.getBytes());

        // Return the path of the uploaded file relative to the base directory
        return "/files/" + subFolder + "/" + uniqueFilename;
    }

    // Function to create directory if it does not exist
    private static void createDirectoryIfNotExists(Path path) throws IOException {
        if (!Files.exists(path)) {
            Files.createDirectories(path);
        }
    }
}