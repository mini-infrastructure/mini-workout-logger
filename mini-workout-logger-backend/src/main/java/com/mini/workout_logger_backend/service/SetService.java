package com.mini.workout_logger_backend.service;

import com.mini.java_core.service.AbstractService;
import com.mini.workout_logger_backend.dto.SetReadDTO;
import com.mini.workout_logger_backend.dto.SetWriteDTO;
import com.mini.workout_logger_backend.entity.Set;
import com.mini.workout_logger_backend.mapper.SetMapper;
import com.mini.workout_logger_backend.repository.SetRepository;
import org.springframework.stereotype.Service;

@Service
public class SetService extends AbstractService<Set,
                                                SetReadDTO,
                                                SetWriteDTO,
                                                SetMapper,
                                                SetRepository> {

}
