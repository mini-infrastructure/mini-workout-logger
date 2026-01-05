package com.mini.workout_logger_backend.controller;

import com.mini.java_core.controller.AbstractController;
import com.mini.workout_logger_backend.dto.WorkoutReadDTO;
import com.mini.workout_logger_backend.dto.WorkoutWriteDTO;
import com.mini.workout_logger_backend.entity.Workout;
import com.mini.workout_logger_backend.mapper.WorkoutMapper;
import com.mini.workout_logger_backend.repository.WorkoutRepository;
import com.mini.workout_logger_backend.service.WorkoutService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("workouts")
@Tag(name = "Workout", description = "Workout API")
public class WorkoutController extends AbstractController<Workout,
                                                          WorkoutReadDTO,
                                                          WorkoutWriteDTO,
                                                          WorkoutMapper,
                                                          WorkoutRepository,
                                                          WorkoutService> {
}
