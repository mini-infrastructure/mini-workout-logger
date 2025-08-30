package com.mini.workout_logger_backend.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/exercise-executions")
@Tag(name = "Exercise Execution", description = "Exercise Execution API")
public class ExerciseExecutionController <Exercise,
        ExerciseDTO,
        ExerciseMapper,
        ExerciseRepository,
        ExerciseService> {

}
