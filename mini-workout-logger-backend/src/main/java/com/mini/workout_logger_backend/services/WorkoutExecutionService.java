package com.mini.workout_logger_backend.services;

import com.mini.java_core.dto.ResponseDTO;
import com.mini.java_core.entity.ResponseHelper;
import com.mini.workout_logger_backend.dtos.WorkoutExecutionLogReadDTO;
import com.mini.java_core.enums.ResponseMessage;
import com.mini.java_core.service.AbstractService;
import com.mini.java_core.service.MessageService;
import com.mini.workout_logger_backend.dtos.FinishWorkoutExecutionWriteDTO;
import com.mini.workout_logger_backend.dtos.SetExecutionWriteDTO;
import com.mini.workout_logger_backend.dtos.WorkoutExecutionReadDTO;
import com.mini.workout_logger_backend.dtos.WorkoutExecutionWriteDTO;
import com.mini.workout_logger_backend.dtos.WorkoutExerciseExecutionWriteDTO;
import com.mini.workout_logger_backend.entities.SetExecution;
import com.mini.workout_logger_backend.entities.Workout;
import com.mini.workout_logger_backend.entities.WorkoutExecution;
import com.mini.workout_logger_backend.entities.WorkoutExerciseExecution;
import com.mini.workout_logger_backend.mappers.WorkoutExecutionMapper;
import com.mini.workout_logger_backend.mappers.WorkoutExerciseExecutionMapper;
import com.mini.workout_logger_backend.repositories.WorkoutExecutionRepository;
import com.mini.workout_logger_backend.repositories.WorkoutRepository;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

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
    WorkoutExerciseExecutionMapper exerciseExecutionMapper;

    @Autowired
    private Validator validator;

    @Autowired
    private MessageService messageService;

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
    public WorkoutExecutionWriteDTO workoutExecutionFromTemplate(WorkoutExecutionWriteDTO template,
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

    // Todo: Fazer um merge entre a execução realizada com a definição estática do treino. O merge pode conter
    // Todo: exercícios a mais, a menos; uma atualização parcial dos sets (exemplo, somente o primeiro set foi
    // Todo: executado, e, em relação a esse, foi alterado o peso. logo o treino correspondente deve manter os
    // Todo: demais sets intactos, e editar o primeiro set com o peso atualizado), ou total, onde todos os sets
    // Todo: sofreram alterações; deve ser possível remover sets também.

    public ResponseEntity<ResponseDTO<WorkoutExecutionReadDTO>> create(Long workoutId,
                                                                       WorkoutExecutionWriteDTO execution) {
        // Get parent workout.
        Workout workout = workoutRepository.safeFindById(workoutId);
        execution.setWorkoutId(workoutId);

        // Validate input.
        Set<ConstraintViolation<WorkoutExecutionWriteDTO>> violations = validator.validate(execution);
        if (!violations.isEmpty()) {
            throw new ConstraintViolationException(violations);
        }

        // Creates a template from the static definition of the workout.
        WorkoutExecutionWriteDTO template = mapper.templateFromWorkout(workout);
        WorkoutExecutionWriteDTO merged = workoutExecutionFromTemplate(template, execution);

        // Convert execution DTO to entity.
        WorkoutExecution workoutExecution = mapper.toEntity(merged);
        workoutExecution.setWorkout(workout);
        workoutExecution.getInterval().setStart();

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

    public ResponseEntity<ResponseDTO<WorkoutExecutionReadDTO>> finish(Long workoutId,
                                                                       Long workoutExecutionId,
                                                                       FinishWorkoutExecutionWriteDTO dto) {
        WorkoutExecution execution = repository.safeFindById(workoutExecutionId);
        if (!execution.getWorkout().getId().equals(workoutId)) {
            return ResponseHelper.error(HttpStatus.BAD_REQUEST,
                    messageService.getLocalizedMessage(
                            "error.workout_execution.execution_does_not_belong_to_workout",
                            workoutExecutionId,
                            workoutId),
                    List.of());
        }

        // Build a lookup map from set_execution_id → completion data
        Map<Long, FinishWorkoutExecutionWriteDTO.SetCompletionDTO> completionMap =
                dto.getSetExecutions() == null ? Map.of() :
                dto.getSetExecutions().stream()
                   .collect(Collectors.toMap(
                           FinishWorkoutExecutionWriteDTO.SetCompletionDTO::getSetExecutionId,
                           Function.identity()
                   ));

        for (WorkoutExerciseExecution wee : execution.getWorkoutExerciseExecutions()) {
            for (SetExecution se : wee.getSetExecutions()) {
                FinishWorkoutExecutionWriteDTO.SetCompletionDTO completion =
                        completionMap.get(se.getId());
                if (completion != null) {
                    se.setCompleted(completion.isCompleted());
                    se.setSkipped(completion.isSkipped());
                }
            }
        }

        execution.getInterval().setEnd();
        WorkoutExecution saved = repository.save(execution);
        return ResponseHelper.success(HttpStatus.OK,
                ResponseMessage.ENTITY_UPDATED.getMessage(),
                List.of(mapper.toDTO(saved)));
    }

    public ResponseEntity<ResponseDTO<Void>> delete(Long workoutId, Long workoutExecutionId) {
        // Get parent workout.
        Workout workout = workoutRepository.safeFindById(workoutId);

        // Get execution.
        WorkoutExecution execution = repository.safeFindById(workoutExecutionId);
        if (!execution.getWorkout().getId().equals(workoutId)) {
            return ResponseHelper.error(HttpStatus.BAD_REQUEST,
                    messageService.getLocalizedMessage(
                            "error.workout_execution.execution_does_not_belong_to_workout",
                            workoutExecutionId,
                            workoutId),
                    List.of());
        }

        repository.delete(execution);
        return ResponseHelper.success(HttpStatus.OK,
                ResponseMessage.ENTITY_DELETED.getMessage(),
                List.of());
    }

    public ResponseEntity<ResponseDTO<WorkoutExecutionLogReadDTO>> getLog(Map<String, String> params) {
        int page = params.containsKey("page") ? Integer.parseInt(params.get("page")) : 0;
        int size = params.containsKey("size") ? Integer.parseInt(params.get("size")) : 10;
        String search = params.getOrDefault("search", null);
        if (search != null && search.isBlank()) search = null;
        final String searchLower = search != null ? search.toLowerCase() : null;

        // Fetch one large page, filter by name in Java (avoids bytea cast on TextConverter column)
        Pageable allPageable = PageRequest.of(0, 10_000);
        Page<WorkoutExecution> all = repository.findAllSortedByDate(allPageable);

        List<WorkoutExecutionLogReadDTO> filtered = all.getContent().stream()
                .filter(we -> searchLower == null ||
                              we.getWorkout().getName().getCode().toLowerCase().contains(searchLower))
                .map(we -> {
                    WorkoutExecutionLogReadDTO dto = new WorkoutExecutionLogReadDTO();
                    dto.setId(we.getId());
                    dto.setWorkoutId(we.getWorkout().getId());
                    dto.setWorkoutName(we.getWorkout().getName().getCode());
                    dto.setStartTime(we.getInterval().getStart());
                    Long durationSeconds = we.getInterval().getDuration() != null
                            ? we.getInterval().getDuration().getSeconds()
                            : null;
                    dto.setDurationSeconds(durationSeconds);
                    dto.setCompleted(we.getCompleted());
                    return dto;
                })
                .collect(Collectors.toList());

        int total = filtered.size();
        int fromIndex = Math.min(page * size, total);
        int toIndex   = Math.min(fromIndex + size, total);
        List<WorkoutExecutionLogReadDTO> pageContent = filtered.subList(fromIndex, toIndex);

        Page<WorkoutExecutionLogReadDTO> resultPage = new PageImpl<>(
                pageContent, PageRequest.of(page, size), total);

        return ResponseHelper.success(HttpStatus.OK,
                resultPage.isEmpty() ? "No executions found." : "Executions found.",
                resultPage);
    }

    @Override
    public ResponseEntity<ResponseDTO<WorkoutExecutionReadDTO>> getAll(Map<String, String> params) {
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
