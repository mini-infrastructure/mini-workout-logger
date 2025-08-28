package com.mini.workout_logger_backend.service;

import com.mini.java_core.service.AbstractService;
import com.mini.workout_logger_backend.dto.ExerciseDTO;
import com.mini.workout_logger_backend.entity.Exercise;
import com.mini.workout_logger_backend.mapper.ExerciseMapper;
import com.mini.workout_logger_backend.repository.ExerciseRepository;
import org.springframework.stereotype.Service;

@Service
public class ExerciseService extends AbstractService<Exercise,
                                                     ExerciseDTO,
                                                     ExerciseMapper,
                                                     ExerciseRepository> {

}
