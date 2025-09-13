package com.mini.workout_logger_backend.controller;

import com.mini.java_core.controller.AbstractController;
import com.mini.workout_logger_backend.dto.MuscleDTO;
import com.mini.workout_logger_backend.entity.Muscle;
import com.mini.workout_logger_backend.mapper.MuscleMapper;
import com.mini.workout_logger_backend.repository.MuscleRepository;
import com.mini.workout_logger_backend.service.MuscleService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/muscles")
@Tag(name = "Muscle", description = "Muscle API")
public class MuscleController extends AbstractController<Muscle,
                                                              MuscleDTO,
                                                              MuscleMapper,
                                                              MuscleRepository,
                                                              MuscleService> {

}
