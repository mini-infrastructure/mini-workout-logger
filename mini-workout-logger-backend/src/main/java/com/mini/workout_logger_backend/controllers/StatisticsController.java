package com.mini.workout_logger_backend.controllers;

import com.mini.java_core.dto.ResponseDTO;
import com.mini.workout_logger_backend.dtos.ExerciseStatisticsReadDTO;
import com.mini.workout_logger_backend.services.StatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/exercises/{exerciseId}/statistics")
public class StatisticsController {

    @Autowired
    private StatisticsService statisticsService;

    @GetMapping
    public ResponseEntity<ResponseDTO<ExerciseStatisticsReadDTO>> getExerciseStatistics(
            @PathVariable Long exerciseId,
            @RequestParam(required = false) String mode,
            @RequestParam(required = false) Long workoutId) {
        return statisticsService.getExerciseStatistics(exerciseId, mode, workoutId);
    }

}
