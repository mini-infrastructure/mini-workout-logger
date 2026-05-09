package com.mini.workout_logger_backend.services;

import com.mini.java_core.dto.ResponseDTO;
import com.mini.java_core.entity.ResponseHelper;
import com.mini.java_core.enums.ResponseMessage;
import com.mini.java_core.service.AbstractService;
import com.mini.workout_logger_backend.dtos.DashboardReadDTO;
import com.mini.workout_logger_backend.dtos.DashboardWriteDTO;
import com.mini.workout_logger_backend.entities.Dashboard;
import com.mini.workout_logger_backend.mappers.DashboardMapper;
import com.mini.workout_logger_backend.repositories.DashboardRepository;
import com.mini.workout_logger_backend.repositories.WorkoutExecutionRepository;
import com.mini.workout_logger_backend.repositories.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DashboardService extends AbstractService<Dashboard, DashboardReadDTO, DashboardWriteDTO, DashboardMapper, DashboardRepository> {

    @Autowired
    private WorkoutRepository workoutRepository;

    @Autowired
    private WorkoutExecutionRepository workoutExecutionRepository;

    public ResponseEntity<ResponseDTO<Long>> getWorkoutCount() {
        long count = workoutRepository.count();
        return ResponseHelper.success(HttpStatus.OK,
                ResponseMessage.ENTITY_FOUND.getMessage(),
                List.of(count));
    }

    public ResponseEntity<ResponseDTO<Long>> getExecutionCount() {
        long count = workoutExecutionRepository.count();
        return ResponseHelper.success(HttpStatus.OK,
                ResponseMessage.ENTITY_FOUND.getMessage(),
                List.of(count));
    }

}
