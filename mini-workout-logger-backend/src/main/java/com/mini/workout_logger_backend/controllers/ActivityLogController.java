package com.mini.workout_logger_backend.controllers;

import com.mini.java_core.controller.AbstractController;
import com.mini.workout_logger_backend.dtos.ActivityLogReadDTO;
import com.mini.workout_logger_backend.dtos.ActivityLogWriteDTO;
import com.mini.workout_logger_backend.entities.ActivityLog;
import com.mini.workout_logger_backend.mappers.ActivityLogMapper;
import com.mini.workout_logger_backend.repositories.ActivityLogRepository;
import com.mini.workout_logger_backend.services.ActivityLogService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("activity-logs")
@Tag(name = "Activity Log", description = "Standalone cardio / mind-body activity log API")
public class ActivityLogController extends AbstractController<ActivityLog,
                                                              ActivityLogReadDTO,
                                                              ActivityLogWriteDTO,
                                                              ActivityLogMapper,
                                                              ActivityLogRepository,
                                                              ActivityLogService> {

}
