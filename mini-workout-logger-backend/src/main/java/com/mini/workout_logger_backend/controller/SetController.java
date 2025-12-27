package com.mini.workout_logger_backend.controller;

import com.mini.java_core.controller.AbstractController;
import com.mini.workout_logger_backend.dto.SetDTO;
import com.mini.workout_logger_backend.entity.Set;
import com.mini.workout_logger_backend.mapper.SetMapper;
import com.mini.workout_logger_backend.repository.SetRepository;
import com.mini.workout_logger_backend.service.SetService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/sets")
@Tag(name = "Set", description = "Workout sets API")
public class SetController extends AbstractController<Set,
                                                      SetDTO,
                                                      SetMapper,
                                                      SetRepository,
                                                      SetService> {

}
