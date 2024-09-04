package com.recrutementPlatform.backend.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Component
public class FileUploadUtil {

    private final String BASE_UPLOAD_DIR;

    public FileUploadUtil(@Value("${file.upload-dir}") String uploadDir) {
        this.BASE_UPLOAD_DIR = uploadDir;
    }

    public String saveFile(MultipartFile file, String subFolder) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }

        // Generate a unique filename
        String uniqueFilename = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

        // Define the subfolder path
        Path uploadPath = Paths.get(BASE_UPLOAD_DIR, subFolder);
        createDirectoryIfNotExists(uploadPath);

        // Save the file
        Path filePath = uploadPath.resolve(uniqueFilename);
        Files.write(filePath, file.getBytes());

        // Return the path of the uploaded file relative to the base directory
        return "/files/" + subFolder + "/" + uniqueFilename;
    }

    public boolean deleteFile(String filePath) {
        File file = new File(filePath);
        return file.delete();
    }

    // Function to create directory if it does not exist
    private void createDirectoryIfNotExists(Path path) throws IOException {
        if (!Files.exists(path)) {
            Files.createDirectories(path);
        }
    }
}
