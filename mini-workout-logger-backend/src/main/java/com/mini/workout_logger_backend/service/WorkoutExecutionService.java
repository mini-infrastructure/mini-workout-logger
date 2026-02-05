package com.mini.workout_logger_backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mini.java_core.dto.ResponseDTO;
import com.mini.java_core.entity.ResponseHelper;
import com.mini.java_core.enums.ResponseMessage;
import com.mini.java_core.service.AbstractService;
import com.mini.workout_logger_backend.annotation.WorkoutExecutionValidated;
import com.mini.workout_logger_backend.dto.SetExecutionWriteDTO;
import com.mini.workout_logger_backend.dto.WorkoutExecutionReadDTO;
import com.mini.workout_logger_backend.dto.WorkoutExecutionWriteDTO;
import com.mini.workout_logger_backend.dto.WorkoutExerciseExecutionWriteDTO;
import com.mini.workout_logger_backend.entity.SetExecution;
import com.mini.workout_logger_backend.entity.Workout;
import com.mini.workout_logger_backend.entity.WorkoutExecution;
import com.mini.workout_logger_backend.entity.WorkoutExerciseExecution;
import com.mini.workout_logger_backend.mapper.WorkoutExecutionMapper;
import com.mini.workout_logger_backend.repository.WorkoutExecutionRepository;
import com.mini.workout_logger_backend.repository.WorkoutRepository;
import com.mini.workout_logger_backend.validation.WorkoutExecutionValidator;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Validator;
import org.aspectj.apache.bcel.generic.ObjectType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class WorkoutExecutionService  extends AbstractService<WorkoutExecution,
                                                              WorkoutExecutionReadDTO,
                                                              WorkoutExecutionWriteDTO,
                                                              WorkoutExecutionMapper,
                                                              WorkoutExecutionRepository> {

    @Autowired
    private WorkoutRepository workoutRepository;

    @Autowired
    public WorkoutExecutionMapper mapper;

    @Autowired
    private Validator validator;

    public ResponseEntity<ResponseDTO<WorkoutExecutionReadDTO>> getAll(Long workoutId) {
        Workout workout = workoutRepository.safeFindById(workoutId);
        List<WorkoutExecution> executions = workout.getWorkoutExecutions();
        return ResponseHelper.success(HttpStatus.OK,
                (executions.isEmpty() ?
                        ResponseMessage.ENTITIES_EMPTY.getMessage() :
                        ResponseMessage.ENTITIES_FOUND.getMessage()),
                mapper.toDTO(executions));
    }

    /**
     * Applies a partial execution input over a template generated from a static Workout definition.
     * <p>
     * The template represents the full execution structure derived from the Workout
     * (all exercises and sets), with execution-specific fields initially unset.
     * The patch contains only the fields provided by the client during execution.
     * <p>
     * This method updates the template with the execution-related values from the patch.
     *
     * @param template a DTO generated from the static Workout definition,
     *                 containing the complete execution structure with empty execution fields
     * @param patch a partially populated DTO provided by the client during execution
     * @return a DTO representing the full execution, combining the static structure
     *         with the execution data supplied in the patch
     */
    public WorkoutExecutionWriteDTO executionFromTemplate(WorkoutExecutionWriteDTO template,
                                                          WorkoutExecutionWriteDTO patch) {
        if (patch == null || patch.getWorkoutExerciseExecutions() == null) {
            return template;
        }

        Map<Long, WorkoutExerciseExecutionWriteDTO> templateExercises =
                template.getWorkoutExerciseExecutions().stream()
                        .collect(Collectors.toMap(
                                WorkoutExerciseExecutionWriteDTO::getWorkoutExerciseId,
                                Function.identity()
                        ));

        for (WorkoutExerciseExecutionWriteDTO patchExercise :
                patch.getWorkoutExerciseExecutions()) {

            WorkoutExerciseExecutionWriteDTO targetExercise =
                    templateExercises.get(patchExercise.getWorkoutExerciseId());

            if (targetExercise == null) continue;

            if (patchExercise.getSetExecutions() == null) continue;

            Map<Long, SetExecutionWriteDTO> templateSets =
                    targetExercise.getSetExecutions().stream()
                            .collect(Collectors.toMap(
                                    SetExecutionWriteDTO::getSetId,
                                    Function.identity()
                            ));

            for (SetExecutionWriteDTO patchSet :
                    patchExercise.getSetExecutions()) {

                SetExecutionWriteDTO targetSet =
                        templateSets.get(patchSet.getSetId());

                if (targetSet == null) continue;

                if (patchSet.isCompleted()) {
                    targetSet.setCompleted(true);
                }
                if (patchSet.getActualRepetitions() != null) {
                    targetSet.setActualRepetitions(
                            patchSet.getActualRepetitions()
                    );
                }
                if (patchSet.getActualWeight() != null) {
                    targetSet.setActualWeight(
                            patchSet.getActualWeight()
                    );
                }
                if (patchSet.getActualDurationSeconds() != null) {
                    targetSet.setActualDurationSeconds(
                            patchSet.getActualDurationSeconds()
                    );
                }
            }
        }

        return template;
    }

    public ResponseEntity<ResponseDTO<WorkoutExecutionReadDTO>> create(Long workoutId,
                                                                       WorkoutExecutionWriteDTO dto) {
        // Get parent workout.
        Workout workout = workoutRepository.safeFindById(workoutId);
        dto.setWorkoutId(workoutId);

        // Validate input.
        Set<ConstraintViolation<WorkoutExecutionWriteDTO>> violations = validator.validate(dto);
        if (!violations.isEmpty()) {
            throw new ConstraintViolationException(violations);
        }

        // Creates a template from the static definition of the workout.
        WorkoutExecutionWriteDTO template = mapper.templateFromWorkout(workout);
        WorkoutExecutionWriteDTO merged = executionFromTemplate(template, dto);

        // Convert execution DTO to entity.
        WorkoutExecution workoutExecution = mapper.toEntity(merged);
        workoutExecution.setWorkout(workout);

        // Set bidirectional relationships.
        for (WorkoutExerciseExecution wee : workoutExecution.getWorkoutExerciseExecutions()) {
            wee.setWorkoutExecution(workoutExecution);

            for (SetExecution se : wee.getSetExecutions()) {
                se.setWorkoutExerciseExecution(wee);
            }
        }

        WorkoutExecution savedExecution = repository.save(workoutExecution);
        return ResponseHelper.success(HttpStatus.CREATED,
                ResponseMessage.ENTITY_CREATED.getMessage(),
                List.of(mapper.toDTO(savedExecution)));
    }

    @Override
    public ResponseEntity<ResponseDTO<WorkoutExecutionReadDTO>> getAll() {
        throw new UnsupportedOperationException(
                "Use getAll(Long workoutId) to get workout executions for a specific workout."
        );
    }

    @Override
    public ResponseEntity<ResponseDTO<WorkoutExecutionReadDTO>> getById(Long id) {
        throw new UnsupportedOperationException(
                "Not supported. Use getAll(Long workoutId) to get workout executions for a specific workout."
        );
    }

    @Override
    public ResponseEntity<ResponseDTO<WorkoutExecutionReadDTO>> create(WorkoutExecutionWriteDTO dto) {
        throw new UnsupportedOperationException(
                "Use create(Long workoutId, WorkoutExecutionWriteDTO dto) to create a workout execution for a specific workout."
        );
    }

    @Override
    public ResponseEntity<ResponseDTO<WorkoutExecutionReadDTO>> update(Long id, WorkoutExecutionWriteDTO dto) {
        throw new UnsupportedOperationException(
                "Use update(Long workoutId, Long id, WorkoutExecutionWriteDTO dto) to update a workout execution for a specific workout."
        );
    }

    @Override
    public ResponseEntity<ResponseDTO<WorkoutExecutionReadDTO>> delete(Long id) {
        throw new UnsupportedOperationException(
                "Use delete(Long workoutId, Long id) to delete a workout execution for a specific workout."
        );
    }
}
