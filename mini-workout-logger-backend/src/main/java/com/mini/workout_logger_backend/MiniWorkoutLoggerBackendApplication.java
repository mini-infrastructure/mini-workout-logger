package com.mini.workout_logger_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.support.ResourceBundleMessageSource;

import java.util.Locale;

@SpringBootApplication
public class MiniWorkoutLoggerBackendApplication {

	public static void main(String[] args) {
        ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
        messageSource.setBasename("i18n/messages");
        messageSource.setDefaultEncoding("UTF-8");
        System.out.println(messageSource.getMessage("exercise.type.machine", null, Locale.ENGLISH));
		SpringApplication.run(MiniWorkoutLoggerBackendApplication.class, args);
	}

}
