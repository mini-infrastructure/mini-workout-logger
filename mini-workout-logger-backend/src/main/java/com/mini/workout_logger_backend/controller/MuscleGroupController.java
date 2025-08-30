package com.mini.workout_logger_backend.controller;

import com.mini.java_core.controller.AbstractController;
import com.mini.workout_logger_backend.dto.MuscleGroupDTO;
import com.mini.workout_logger_backend.entity.MuscleGroup;
import com.mini.workout_logger_backend.mapper.MuscleGroupMapper;
import com.mini.workout_logger_backend.repository.MuscleGroupRepository;
import com.mini.workout_logger_backend.service.MuscleGroupService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/muscle_groups")
@Tag(name = "MuscleGroup", description = "MuscleGroup API")
public class MuscleGroupController extends AbstractController<MuscleGroup,
                                                              MuscleGroupDTO,
                                                              MuscleGroupMapper,
                                                              MuscleGroupRepository,
                                                              MuscleGroupService> {

}
