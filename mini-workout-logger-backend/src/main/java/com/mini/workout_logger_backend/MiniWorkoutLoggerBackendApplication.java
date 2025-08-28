package com.mini.workout_logger_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.support.ResourceBundleMessageSource;

@SpringBootApplication(scanBasePackages = {
        "com.mini.workout_logger_backend",
        "com.mini.java_core",
        "com.mini.java_core.service"})
public class MiniWorkoutLoggerBackendApplication {

	public static void main(String[] args) {
        // Configure i18n.
        ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
        messageSource.setBasename("i18n/messages");
        messageSource.setDefaultEncoding("UTF-8");
		SpringApplication.run(MiniWorkoutLoggerBackendApplication.class, args);
	}

}
