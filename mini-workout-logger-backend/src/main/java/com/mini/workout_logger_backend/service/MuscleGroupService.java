package com.mini.workout_logger_backend.service;

import com.mini.java_core.service.AbstractService;
import com.mini.workout_logger_backend.dto.MuscleGroupDTO;
import com.mini.workout_logger_backend.entity.MuscleGroup;
import com.mini.workout_logger_backend.mapper.MuscleGroupMapper;
import com.mini.workout_logger_backend.repository.MuscleGroupRepository;
import org.springframework.stereotype.Service;

@Service
public class MuscleGroupService extends AbstractService<MuscleGroup,
                                                        MuscleGroupDTO,
                                                        MuscleGroupMapper,
                                                        MuscleGroupRepository> {

}
