package com.recrutementPlatform.backend.util;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class stringUtil {

    public static List<String> splitEmails(String emailString) {
        if (emailString == null || emailString.isEmpty()) {
            return Arrays.asList();
        }

        String[] emails = emailString.split(",");
        return Arrays.stream(emails)
                .map(String::trim)
                .collect(Collectors.toList());
    }
}
