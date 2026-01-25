package com.mini.workout_logger_backend.service;

import com.mini.java_core.dto.ResponseDTO;
import com.mini.java_core.entity.ResponseHelper;
import com.mini.java_core.enums.ResponseMessage;
import com.mini.java_core.service.AbstractService;
import com.mini.java_core.service.MessageService;
import com.mini.workout_logger_backend.dto.*;
import com.mini.workout_logger_backend.entity.Workout;
import com.mini.workout_logger_backend.entity.WorkoutExercise;
import com.mini.workout_logger_backend.mapper.SetMapper;
import com.mini.workout_logger_backend.mapper.WorkoutExerciseMapper;
import com.mini.workout_logger_backend.mapper.WorkoutMapper;
import com.mini.workout_logger_backend.repository.SetRepository;
import com.mini.workout_logger_backend.repository.WorkoutExerciseRepository;
import com.mini.workout_logger_backend.repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkoutService extends AbstractService<Workout,
                                                    WorkoutReadDTO,
                                                    WorkoutWriteDTO,
                                                    WorkoutMapper,
                                                    WorkoutRepository> {

    @Autowired
    public WorkoutExerciseRepository workoutExerciseRepository;

    @Autowired
    public WorkoutExerciseMapper workoutExerciseMapper;

    @Autowired
    public SetRepository setRepository;

    @Autowired
    public SetMapper setMapper;

    @Autowired
    private MessageService messageService;

    public ResponseEntity<ResponseDTO<WorkoutExerciseReadDTO>> listExercises(Long workoutId) {
        Workout workout = repository.safeFindById(workoutId);
        return ResponseHelper.success(HttpStatus.OK,
                ResponseMessage.ENTITIES_FOUND.getMessage(),
                workoutExerciseMapper.toDTO(workout.getWorkoutExercises()));
    }

    public ResponseEntity<ResponseDTO<WorkoutExerciseReadDTO>> addExercise(Long workoutId,
                                                                           WorkoutExerciseWriteDTO workoutExercise) {
        Workout workout = repository.safeFindById(workoutId);
        WorkoutExercise exercise = workoutExerciseMapper.toEntity(workoutExercise);
        workout.addWorkoutExercise(exercise);
        Workout savedWorkout = repository.save(workout);
        return ResponseHelper.success(HttpStatus.OK,
                ResponseMessage.ENTITY_CREATED.getMessage(),
                workoutExerciseMapper.toDTO(savedWorkout.getWorkoutExercises()));
    }

    public ResponseEntity<ResponseDTO<WorkoutExerciseReadDTO>> reorderExercise(Long workoutId,
                                                                               Long exerciseId,
                                                                               Integer newPosition) {
        Workout workout = repository.safeFindById(workoutId);
        WorkoutExercise exercise = workoutExerciseRepository.safeFindById(exerciseId);
        if (!workout.getWorkoutExercises().contains(exercise)) {
            return ResponseHelper.error(HttpStatus.CONFLICT,
                    ResponseMessage.ENTITY_DOES_NOT_BELONG_TO_PARENT.getMessage(),
                    List.of("Workout exercise with ID " + exerciseId + " does not belong to workout with ID " + workoutId));
        }

        int oldPosition = workout.getWorkoutExercises().indexOf(exercise);

        if (oldPosition == newPosition) {
            return ResponseHelper.success(HttpStatus.OK,
                    ResponseMessage.ENTITY_UNCHANGED.getMessage(),
                    workoutExerciseMapper.toDTO(workout.getWorkoutExercises()));
        }

        if (newPosition < 0 || newPosition >= workout.getWorkoutExercises().size()) {
            return ResponseHelper.error(HttpStatus.BAD_REQUEST,
                    messageService.getLocalizedMessage("error.position_out_of_bounds"),
                    List.of());
        }

        workout.reorderWorkoutExercise(exercise, newPosition);
        Workout savedWorkout = repository.save(workout);
        return ResponseHelper.success(HttpStatus.OK,
                ResponseMessage.ENTITY_UPDATED.getMessage(),
                workoutExerciseMapper.toDTO(savedWorkout.getWorkoutExercises()));
    }

    public ResponseEntity<ResponseDTO<WorkoutExerciseReadDTO>> removeExercise(Long workoutId, Long exerciseId) {
        Workout workout = repository.safeFindById(workoutId);
        WorkoutExercise exercise = workoutExerciseRepository.safeFindById(exerciseId);
        if (!workout.getWorkoutExercises().contains(exercise)) {
            return ResponseHelper.error(HttpStatus.CONFLICT,
                    ResponseMessage.ENTITY_DOES_NOT_BELONG_TO_PARENT.getMessage(),
                    List.of("Workout exercise with ID " + exerciseId + " does not belong to workout with ID " + workoutId));
        }
        workout.removeWorkoutExercise(exercise);
        workoutExerciseRepository.delete(exercise);
        Workout savedWorkout = repository.save(workout);
        return ResponseHelper.success(HttpStatus.OK,
                ResponseMessage.ENTITY_DELETED.getMessage(),
                workoutExerciseMapper.toDTO(savedWorkout.getWorkoutExercises()));
    }

    public ResponseEntity<ResponseDTO<SetReadDTO>> listSets(Long workoutId, Long exerciseId) {
        Workout workout = repository.safeFindById(workoutId);
        WorkoutExercise exercise = workoutExerciseRepository.safeFindById(exerciseId);
        if (!workout.getWorkoutExercises().contains(exercise)) {
            return ResponseHelper.error(HttpStatus.CONFLICT,
                    ResponseMessage.ENTITY_DOES_NOT_BELONG_TO_PARENT.getMessage(),
                    List.of());
        }
        return ResponseHelper.success(HttpStatus.OK,
                ResponseMessage.ENTITIES_FOUND.getMessage(),
                setMapper.toDTO(exercise.getSets()));
    }

    public ResponseEntity<ResponseDTO<SetReadDTO>> addSet(Long workoutId,
                                                          Long exerciseId,
                                                          SetWriteDTO setWriteDTO) {
        Workout workout = repository.safeFindById(workoutId);
        WorkoutExercise exercise = workoutExerciseRepository.safeFindById(exerciseId);
        if (!workout.getWorkoutExercises().contains(exercise)) {
            return ResponseHelper.error(HttpStatus.CONFLICT,
                    ResponseMessage.ENTITY_DOES_NOT_BELONG_TO_PARENT.getMessage(),
                    List.of("Workout exercise with ID " + exerciseId + " does not belong to workout with ID " + workoutId));
        }
        var set = setMapper.toEntity(setWriteDTO);
        exercise.addSet(set);
        workoutExerciseRepository.save(exercise);
        return ResponseHelper.success(HttpStatus.OK,
                ResponseMessage.ENTITY_CREATED.getMessage(),
                setMapper.toDTO(exercise.getSets()));
    }

    public ResponseEntity<ResponseDTO<SetReadDTO>> reorderSet(Long workoutId,
                                                          Long exerciseId,
                                                          Long setId,
                                                          Integer newPosition) {
        Workout workout = repository.safeFindById(workoutId);
        WorkoutExercise exercise = workoutExerciseRepository.safeFindById(exerciseId);
        if (!workout.getWorkoutExercises().contains(exercise)) {
            return ResponseHelper.error(HttpStatus.CONFLICT,
                    ResponseMessage.ENTITY_DOES_NOT_BELONG_TO_PARENT.getMessage(),
                    List.of("Workout exercise with ID " + exerciseId + " does not belong to workout with ID " + workoutId));
        }
        var set = setRepository.safeFindById(setId);
        if (!exercise.getSets().contains(set)) {
            return ResponseHelper.error(HttpStatus.CONFLICT,
                    ResponseMessage.ENTITY_DOES_NOT_BELONG_TO_PARENT.getMessage(),
                    List.of("Set with ID " + setId + " does not belong to workout exercise with ID " + exerciseId));
        }

        int oldPosition = exercise.getSets().indexOf(set);

        if (oldPosition == newPosition) {
            return ResponseHelper.success(HttpStatus.OK,
                    ResponseMessage.ENTITY_UNCHANGED.getMessage(),
                    setMapper.toDTO(exercise.getSets()));
        }

        if (newPosition < 0 || newPosition >= exercise.getSets().size()) {
            return ResponseHelper.error(HttpStatus.BAD_REQUEST,
                    messageService.getLocalizedMessage("error.position_out_of_bounds"),
                    List.of());
        }

        exercise.reorderSet(set, newPosition);
        workoutExerciseRepository.save(exercise);
        return ResponseHelper.success(HttpStatus.OK,
                ResponseMessage.ENTITY_UPDATED.getMessage(),
                setMapper.toDTO(exercise.getSets()));
    }

    public ResponseEntity<ResponseDTO<SetReadDTO>> removeSet(Long workoutId,
                                                         Long exerciseId,
                                                         Long setId) {
        Workout workout = repository.safeFindById(workoutId);
        WorkoutExercise exercise = workoutExerciseRepository.safeFindById(exerciseId);
        if (!workout.getWorkoutExercises().contains(exercise)) {
            return ResponseHelper.error(HttpStatus.CONFLICT,
                    ResponseMessage.ENTITY_DOES_NOT_BELONG_TO_PARENT.getMessage(),
                    List.of("Workout exercise with ID " + exerciseId + " does not belong to workout with ID " + workoutId));
        }
        var set = setRepository.safeFindById(setId);
        if (!exercise.getSets().contains(set)) {
            return ResponseHelper.error(HttpStatus.CONFLICT,
                    ResponseMessage.ENTITY_DOES_NOT_BELONG_TO_PARENT.getMessage(),
                    List.of("Set with ID " + setId + " does not belong to workout exercise with ID " + exerciseId));
        }
        exercise.removeSet(set);
        setRepository.delete(set);
        workoutExerciseRepository.save(exercise);
        return ResponseHelper.success(HttpStatus.OK,
                ResponseMessage.ENTITY_DELETED.getMessage(),
                setMapper.toDTO(exercise.getSets()));
    }

}