package com.mini.workout_logger_backend.controller;

import com.mini.java_core.controller.AbstractController;
import com.mini.java_core.dto.ResponseDTO;
import com.mini.workout_logger_backend.dto.MuscleDTO;
import com.mini.workout_logger_backend.entity.Muscle;
import com.mini.workout_logger_backend.mapper.MuscleMapper;
import com.mini.workout_logger_backend.repository.MuscleRepository;
import com.mini.workout_logger_backend.service.MuscleService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/muscles")
@Tag(name = "Muscle", description = "Muscle API")
public class MuscleController extends AbstractController<Muscle,
                                                         MuscleDTO,
                                                         MuscleMapper,
                                                         MuscleRepository,
                                                         MuscleService> {

    @GetMapping("/{muscleId}/parents")
    public ResponseEntity<ResponseDTO<MuscleDTO>> getParentMuscles(@NotNull @PathVariable("muscleId") Long muscleId) {
        return this.service.getParentMuscles(muscleId);
    }

}
