package com.mini.workout_logger_backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mini.java_core.dto.ResponseDTO;
import com.mini.java_core.entity.ResponseHelper;
import com.mini.java_core.enums.ResponseMessage;
import com.mini.java_core.service.AbstractService;
import com.mini.workout_logger_backend.dto.WorkoutExecutionReadDTO;
import com.mini.workout_logger_backend.dto.WorkoutExecutionWriteDTO;
import com.mini.workout_logger_backend.entity.Workout;
import com.mini.workout_logger_backend.entity.WorkoutExecution;
import com.mini.workout_logger_backend.mapper.WorkoutExecutionMapper;
import com.mini.workout_logger_backend.repository.WorkoutExecutionRepository;
import com.mini.workout_logger_backend.repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.xml.validation.Validator;
import java.util.List;

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
    private ObjectMapper objectMapper;

    public ResponseEntity<ResponseDTO<WorkoutExecutionReadDTO>> getAll(Long workoutId) {
        Workout workout = workoutRepository.safeFindById(workoutId);
        List<WorkoutExecution> executions = workout.getWorkoutExecutions();
        return ResponseHelper.success(HttpStatus.OK,
                (executions.isEmpty() ?
                        ResponseMessage.ENTITIES_EMPTY.getMessage() :
                        ResponseMessage.ENTITIES_FOUND.getMessage()),
                mapper.toDTO(executions));
    }

    public ResponseEntity<ResponseDTO<WorkoutExecutionReadDTO>> create(Long workoutId,
                                                                       WorkoutExecutionWriteDTO dto) throws JsonProcessingException {
        Workout workout = workoutRepository.safeFindById(workoutId);
        dto.setWorkoutId(workoutId);

        WorkoutExecution workoutExecution = mapper.toEntity(dto);
        workoutExecution.setWorkout(workout);

        ObjectMapper objectMapper = new ObjectMapper();
        String jsonString = objectMapper.writeValueAsString(workoutExecution);
        System.out.println("Serialized JSON: " + jsonString);

//        WorkoutExecution savedExecution = repository.save(workoutExecution);

        return ResponseHelper.success(HttpStatus.CREATED,
                ResponseMessage.ENTITY_CREATED.getMessage(),
                List.of(mapper.toDTO(workoutExecution)));
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
