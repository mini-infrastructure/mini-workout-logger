package com.mini.workout_logger_backend.controllers;

import com.mini.java_core.controller.AbstractController;
import com.mini.workout_logger_backend.dtos.WidgetReadDTO;
import com.mini.workout_logger_backend.dtos.WidgetWriteDTO;
import com.mini.workout_logger_backend.entities.Widget;
import com.mini.workout_logger_backend.mappers.WidgetMapper;
import com.mini.workout_logger_backend.repositories.WidgetRepository;
import com.mini.workout_logger_backend.services.WidgetService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("widgets")
@Tag(name = "Widget", description = "Widget API")
public class WidgetController extends AbstractController<Widget,
                                                         WidgetReadDTO,
                                                         WidgetWriteDTO,
                                                         WidgetMapper,
                                                         WidgetRepository,
                                                         WidgetService> {
}
