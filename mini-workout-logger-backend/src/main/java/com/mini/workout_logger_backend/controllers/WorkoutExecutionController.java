package com.mini.workout_logger_backend.controllers;

import com.mini.java_core.dto.ResponseDTO;
import com.mini.workout_logger_backend.dtos.WorkoutExecutionLogReadDTO;
import com.mini.workout_logger_backend.services.WorkoutExecutionService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("workout-executions")
@Tag(name = "Workout Execution Log", description = "Global workout execution log API")
public class WorkoutExecutionController {

    @Autowired
    private WorkoutExecutionService executionService;

    @GetMapping
    public ResponseEntity<ResponseDTO<WorkoutExecutionLogReadDTO>> getLog(
            @RequestParam(name = "page",   defaultValue = "0")  int page,
            @RequestParam(name = "size",   defaultValue = "10") int size,
            @RequestParam(name = "search", required = false)    String search) {
        Map<String, String> params = new HashMap<>();
        params.put("page", String.valueOf(page));
        params.put("size", String.valueOf(size));
        if (search != null) params.put("search", search);
        return executionService.getLog(params);
    }

}
