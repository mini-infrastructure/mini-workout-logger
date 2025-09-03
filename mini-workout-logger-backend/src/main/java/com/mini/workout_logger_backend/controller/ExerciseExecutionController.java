package com.mini.workout_logger_backend.controller;

import com.mini.java_core.controller.AbstractController;
import com.mini.workout_logger_backend.dto.ExerciseExecutionDTO;
import com.mini.workout_logger_backend.entity.ExerciseExecution;
import com.mini.workout_logger_backend.mapper.ExerciseExecutionMapper;
import com.mini.workout_logger_backend.repository.ExerciseExecutionRepository;
import com.mini.workout_logger_backend.service.ExerciseExecutionService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/exercise-executions")
@Tag(name = "Exercise Execution", description = "Exercise Execution API")
public class ExerciseExecutionController extends AbstractController<ExerciseExecution,
                                                                    ExerciseExecutionDTO,
                                                                    ExerciseExecutionMapper,
                                                                    ExerciseExecutionRepository,
                                                                    ExerciseExecutionService> {

}

