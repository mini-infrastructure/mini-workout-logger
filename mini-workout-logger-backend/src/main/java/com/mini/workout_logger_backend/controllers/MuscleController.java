package com.mini.workout_logger_backend.controllers;

import com.mini.java_core.controller.AbstractController;
import com.mini.java_core.dto.ResponseDTO;
import com.mini.workout_logger_backend.dtos.MuscleReadDTO;
import com.mini.workout_logger_backend.dtos.MuscleWriteDTO;
import com.mini.workout_logger_backend.entities.Muscle;
import com.mini.workout_logger_backend.mappers.MuscleMapper;
import com.mini.workout_logger_backend.repositories.MuscleRepository;
import com.mini.workout_logger_backend.services.MuscleService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/muscles")
@Tag(name = "Muscle", description = "Muscle API")
public class MuscleController extends AbstractController<Muscle,
                                                         MuscleReadDTO,
                                                         MuscleWriteDTO,
                                                         MuscleMapper,
                                                         MuscleRepository,
                                                         MuscleService> {

    @GetMapping("/{muscleId}/parents")
    public ResponseEntity<ResponseDTO<MuscleReadDTO>> getParentMuscles(
            @NotNull @PathVariable("muscleId") Long muscleId) {
        return this.service.getParentMuscles(muscleId);
    }

}
