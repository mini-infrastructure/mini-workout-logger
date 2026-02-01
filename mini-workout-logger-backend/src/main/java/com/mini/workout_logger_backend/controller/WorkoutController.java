package com.mini.workout_logger_backend.controller;

import com.mini.java_core.controller.AbstractController;
import com.mini.java_core.dto.ResponseDTO;
import com.mini.workout_logger_backend.dto.*;
import com.mini.workout_logger_backend.entity.Workout;
import com.mini.workout_logger_backend.mapper.WorkoutMapper;
import com.mini.workout_logger_backend.repository.WorkoutRepository;
import com.mini.workout_logger_backend.service.WorkoutService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("workouts")
@Tag(name = "Workout", description = "Workout API")
public class WorkoutController extends AbstractController<Workout,
                                                          WorkoutReadDTO,
                                                          WorkoutWriteDTO,
                                                          WorkoutMapper,
                                                          WorkoutRepository,
                                                          WorkoutService> {

    @Tag(name = "Workout Exercise", description = "Workout Exercise API")
    @GetMapping("/{id}/exercises")
    public ResponseEntity<ResponseDTO<WorkoutExerciseReadDTO>> listExercises(@PathVariable("id") @NotNull @Min(1L) Long workoutId) {
        return service.listExercises(workoutId);
    }

    @Tag(name = "Workout Exercise")
    @PutMapping("/{id}/exercises" )
    public ResponseEntity<ResponseDTO<WorkoutExerciseReadDTO>> addExercise(@PathVariable("id") @NotNull @Min(1L) Long workoutId,
                                                                           @RequestBody @Valid WorkoutExerciseWriteDTO workoutExerciseWriteDTO) {
        return service.addExercise(workoutId, workoutExerciseWriteDTO);
    }

    @Tag(name = "Workout Exercise")
    @PutMapping("/{id}/exercises/reorder/{exerciseId}" )
    public ResponseEntity<ResponseDTO<WorkoutExerciseReadDTO>> reorderExercise(@PathVariable("id") @NotNull @Min(1L) Long workoutId,
                                                                                @PathVariable("exerciseId") @NotNull @Min(1L) Long exerciseId,
                                                                                @RequestParam("newPosition") @NotNull @Min(0L) Integer newPosition) {
        return service.reorderExercise(workoutId, exerciseId, newPosition);
    }

    @Tag(name = "Workout Exercise")
    @PutMapping("/{id}/exercises/remove/{exerciseId}" )
    public ResponseEntity<ResponseDTO<WorkoutExerciseReadDTO>> removeExercise(@PathVariable("id") @NotNull @Min(1L) Long workoutId,
                                                                              @PathVariable("exerciseId") @NotNull @Min(1L) Long exerciseId) {
        return service.removeExercise(workoutId, exerciseId);
    }

    @Tag(name = "Set", description = "Set API")
    @GetMapping("/{id}/exercises/{exerciseId}/sets")
    public ResponseEntity<ResponseDTO<SetReadDTO>> listSets(@PathVariable("id") @NotNull @Min(1L) Long workoutId,
                                                            @PathVariable("exerciseId") @NotNull @Min(1L) Long exerciseId) {
        return service.listSets(workoutId, exerciseId);
    }

    @Tag(name = "Set")
    @PutMapping("/{id}/exercises/{exerciseId}/sets")
    public ResponseEntity<ResponseDTO<SetReadDTO>> addSet(@PathVariable("id") @NotNull @Min(1L) Long workoutId,
                                                          @PathVariable("exerciseId") @NotNull @Min(1L) Long exerciseId,
                                                          @RequestBody @Valid SetWriteDTO setWriteDTO) {
        return service.addSet(workoutId, exerciseId, setWriteDTO);
    }

    @Tag(name = "Set")
    @PutMapping("/{id}/exercises/{exerciseId}/sets/reorder/{setId}" )
    public ResponseEntity<ResponseDTO<SetReadDTO>> reorderSet(@PathVariable("id") @NotNull @Min(1L) Long workoutId,
                                                             @PathVariable("exerciseId") @NotNull @Min(1L) Long exerciseId,
                                                             @PathVariable("setId") @NotNull @Min(1L) Long setId,
                                                             @RequestParam("newPosition") @NotNull @Min(0L) Integer newPosition) {
        return service.reorderSet(workoutId, exerciseId, setId, newPosition);
    }

    @Tag(name = "Set")
    @PutMapping("/{id}/exercises/{exerciseId}/sets/remove/{setId}" )
    public ResponseEntity<ResponseDTO<SetReadDTO>> removeSet(@PathVariable("id") @NotNull @Min(1L) Long workoutId,
                                                            @PathVariable("exerciseId") @NotNull @Min(1L) Long exerciseId,
                                                            @PathVariable("setId") @NotNull @Min(1L) Long setId) {
        return service.removeSet(workoutId, exerciseId, setId);
    }

}
