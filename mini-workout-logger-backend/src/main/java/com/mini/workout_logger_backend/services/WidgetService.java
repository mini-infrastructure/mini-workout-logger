package com.mini.workout_logger_backend.services;

import com.mini.java_core.service.AbstractService;
import com.mini.workout_logger_backend.dtos.WidgetReadDTO;
import com.mini.workout_logger_backend.dtos.WidgetWriteDTO;
import com.mini.workout_logger_backend.entities.Widget;
import com.mini.workout_logger_backend.mappers.WidgetMapper;
import com.mini.workout_logger_backend.repositories.WidgetRepository;
import org.springframework.stereotype.Service;

@Service
public class WidgetService extends AbstractService<Widget, WidgetReadDTO, WidgetWriteDTO, WidgetMapper, WidgetRepository> {
}
