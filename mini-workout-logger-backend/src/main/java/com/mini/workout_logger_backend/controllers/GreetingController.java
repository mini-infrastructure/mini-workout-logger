package com.mini.workout_logger_backend.controllers;

import com.mini.java_core.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GreetingController {

    @Autowired
    private MessageService messageService;

    @GetMapping("/greeting")
    public String getGreeting() {
        return messageService.getLocalizedMessage("ExerciseCategory.STRETCHING");
    }

}
