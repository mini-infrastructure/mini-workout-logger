package com.mini.workout_logger_backend.controllers;

import com.mini.java_core.controller.AbstractController;
import com.mini.java_core.dto.ResponseDTO;
import com.mini.workout_logger_backend.dtos.ExerciseReadDTO;
import com.mini.workout_logger_backend.dtos.ExerciseWriteDTO;
import com.mini.workout_logger_backend.entities.Exercise;
import com.mini.workout_logger_backend.mappers.ExerciseMapper;
import com.mini.workout_logger_backend.repositories.ExerciseRepository;
import com.mini.workout_logger_backend.services.ExerciseService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/exercises")
@Tag(name = "Exercise", description = "Exercise API")
public class ExerciseController extends AbstractController<Exercise,
                                                           ExerciseReadDTO,
                                                           ExerciseWriteDTO,
                                                           ExerciseMapper,
                                                           ExerciseRepository,
                                                           ExerciseService> {

    /**
     * Exercise Group API.
     */

    @Tag(name = "Exercise Group", description = "Exercise Group API")
    @GetMapping("/groups")
    public ResponseEntity<ResponseDTO<String>> getAllExerciseGroupNames() {
        return service.getAllExerciseGroupNames();
    }

    @Tag(name = "Exercise Group")
    @GetMapping("/groups/{groupName}")
    public ResponseEntity<ResponseDTO<ExerciseReadDTO>> getExercisesByGroupName(@PathVariable("groupName") String groupName) {
        return service.listExercisesByMuscleGroup(groupName);
    }

}
