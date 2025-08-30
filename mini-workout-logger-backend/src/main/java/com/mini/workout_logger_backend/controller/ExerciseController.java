package com.mini.workout_logger_backend.controller;

import com.mini.java_core.controller.AbstractController;
import com.mini.workout_logger_backend.dto.ExerciseDTO;
import com.mini.workout_logger_backend.entity.Exercise;
import com.mini.workout_logger_backend.mapper.ExerciseMapper;
import com.mini.workout_logger_backend.repository.ExerciseRepository;
import com.mini.workout_logger_backend.service.ExerciseService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/exercises")
@Tag(name = "Exercise", description = "Exercise API")
public class ExerciseController extends AbstractController<Exercise,
                                                           ExerciseDTO,
                                                           ExerciseMapper,
                                                           ExerciseRepository,
                                                           ExerciseService> {

}
