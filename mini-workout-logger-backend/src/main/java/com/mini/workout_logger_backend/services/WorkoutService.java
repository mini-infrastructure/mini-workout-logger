package com.mini.workout_logger_backend.services;

import com.mini.java_core.dto.ResponseDTO;
import com.mini.java_core.entity.ResponseHelper;
import com.mini.java_core.enums.ResponseMessage;
import com.mini.java_core.service.AbstractService;
import com.mini.java_core.service.MessageService;
import com.mini.workout_logger_backend.dtos.*;
import com.mini.workout_logger_backend.entities.Workout;
import com.mini.workout_logger_backend.entities.WorkoutExercise;
import com.mini.workout_logger_backend.mappers.SetMapper;
import com.mini.workout_logger_backend.mappers.WorkoutExerciseMapper;
import com.mini.workout_logger_backend.mappers.WorkoutMapper;
import com.mini.workout_logger_backend.repositories.SetRepository;
import com.mini.workout_logger_backend.repositories.TagRepository;
import com.mini.workout_logger_backend.repositories.WorkoutExerciseRepository;
import com.mini.workout_logger_backend.repositories.WorkoutRepository;
import jakarta.persistence.criteria.JoinType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class WorkoutService extends AbstractService<Workout,
                                                    WorkoutReadDTO,
                                                    WorkoutWriteDTO,
                                                    WorkoutMapper,
                                                    WorkoutRepository> {

    @Autowired
    private TagRepository tagRepository;

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

    @Override
    public ResponseEntity<ResponseDTO<WorkoutReadDTO>> getAll(Map<String, String> params) {
        Map<String, String> filteredParams = new HashMap<>(params);
        String tags = filteredParams.remove("tags");

        int page = parseIntParam(filteredParams.get("page"), 0);
        int size = parseIntParam(filteredParams.get("size"), 20);
        Pageable pageable = PageRequest.of(page, size);

        Specification<Workout> spec = null;

        if (StringUtils.hasText(tags)) {
            Set<Long> tagIds = Arrays.stream(tags.split(","))
                    .map(String::trim)
                    .filter(s -> !s.isBlank())
                    .map(Long::parseLong)
                    .collect(Collectors.toSet());

            if (!tagIds.isEmpty()) {
                spec = (root, query, cb) -> {
                    query.distinct(true);
                    return root.join("tags", JoinType.INNER).get("id").in(tagIds);
                };
            }
        }

        Page<WorkoutReadDTO> result = repository.findAll(spec, pageable)
                .map(mapper::toDTO);

        return ResponseHelper.success(HttpStatus.OK,
                result.isEmpty() ? ResponseMessage.ENTITIES_EMPTY.getMessage()
                                 : ResponseMessage.ENTITIES_FOUND.getMessage(),
                result);
    }

    private int parseIntParam(String value, int defaultValue) {
        if (value == null || value.isBlank()) return defaultValue;
        try { return Integer.parseInt(value); }
        catch (NumberFormatException e) { return defaultValue; }
    }

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
                    messageService.getLocalizedMessage("error.workout.exercise_does_not_belong_to_workout", exerciseId, workoutId),
                    List.of());
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