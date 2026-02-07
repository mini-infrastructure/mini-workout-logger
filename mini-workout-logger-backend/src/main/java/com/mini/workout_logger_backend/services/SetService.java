package com.mini.workout_logger_backend.services;

import com.mini.java_core.service.AbstractService;
import com.mini.workout_logger_backend.dtos.SetReadDTO;
import com.mini.workout_logger_backend.dtos.SetWriteDTO;
import com.mini.workout_logger_backend.entities.Set;
import com.mini.workout_logger_backend.mappers.SetMapper;
import com.mini.workout_logger_backend.repositories.SetRepository;
import org.springframework.stereotype.Service;

@Service
public class SetService extends AbstractService<Set,
                                                SetReadDTO,
                                                SetWriteDTO,
                                                SetMapper,
                                                SetRepository> {

}
