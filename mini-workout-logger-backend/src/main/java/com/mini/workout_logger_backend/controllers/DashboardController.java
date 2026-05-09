package com.mini.workout_logger_backend.controllers;

import com.mini.java_core.controller.AbstractController;
import com.mini.java_core.dto.ResponseDTO;
import com.mini.workout_logger_backend.dtos.DashboardReadDTO;
import com.mini.workout_logger_backend.dtos.DashboardWriteDTO;
import com.mini.workout_logger_backend.entities.Dashboard;
import com.mini.workout_logger_backend.mappers.DashboardMapper;
import com.mini.workout_logger_backend.repositories.DashboardRepository;
import com.mini.workout_logger_backend.services.DashboardService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("dashboards")
@Tag(name = "Dashboard", description = "Dashboard API")
public class DashboardController extends AbstractController<Dashboard,
                                                            DashboardReadDTO,
                                                            DashboardWriteDTO,
                                                            DashboardMapper,
                                                            DashboardRepository,
                                                            DashboardService> {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/workout-count")
    public ResponseEntity<ResponseDTO<Long>> getWorkoutCount() {
        return dashboardService.getWorkoutCount();
    }

    @GetMapping("/execution-count")
    public ResponseEntity<ResponseDTO<Long>> getExecutionCount() {
        return dashboardService.getExecutionCount();
    }

}
