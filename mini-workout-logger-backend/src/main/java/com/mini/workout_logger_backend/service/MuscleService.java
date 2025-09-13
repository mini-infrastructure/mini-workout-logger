package com.mini.workout_logger_backend.service;

import com.mini.java_core.service.AbstractService;
import com.mini.workout_logger_backend.dto.MuscleDTO;
import com.mini.workout_logger_backend.entity.Muscle;
import com.mini.workout_logger_backend.mapper.MuscleMapper;
import com.mini.workout_logger_backend.repository.MuscleRepository;
import org.springframework.stereotype.Service;

@Service
public class MuscleService extends AbstractService<Muscle,
                                                        MuscleDTO,
                                                        MuscleMapper,
                                                        MuscleRepository> {

}
