package com.mini.workout_logger_backend.service;

import com.mini.java_core.service.AbstractService;
import com.mini.workout_logger_backend.dto.WorkoutReadDTO;
import com.mini.workout_logger_backend.dto.WorkoutWriteDTO;
import com.mini.workout_logger_backend.entity.Workout;
import com.mini.workout_logger_backend.mapper.WorkoutMapper;
import com.mini.workout_logger_backend.repository.WorkoutRepository;
import org.springframework.stereotype.Service;

@Service
public class WorkoutService extends AbstractService<Workout,
                                                    WorkoutReadDTO,
                                                    WorkoutWriteDTO,
                                                    WorkoutMapper,
                                                    WorkoutRepository> {

}