package com.mini.workout_logger_backend.service;

import com.mini.java_core.service.AbstractService;
import com.mini.workout_logger_backend.dto.ExerciseExecutionDTO;
import com.mini.workout_logger_backend.entity.ExerciseExecution;
import com.mini.workout_logger_backend.mapper.ExerciseExecutionMapper;
import com.mini.workout_logger_backend.repository.ExerciseExecutionRepository;
import org.springframework.stereotype.Service;

@Service
public class ExerciseExecutionService extends AbstractService<ExerciseExecution,
                                                              ExerciseExecutionDTO,
                                                              ExerciseExecutionMapper,
                                                              ExerciseExecutionRepository> {

}
