package com.mini.workout_logger_backend.controller;

import com.mini.java_core.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Locale;

@RestController
public class GreetingController {

    @Autowired
    private MessageService messageService;

    @GetMapping("/greeting")
    public String getGreeting(Locale locale) {
        return messageService.getLocalizedMessage("greeting", locale);
    }

}
