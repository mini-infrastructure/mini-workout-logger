package com.mini.workout_logger_backend.service;

import com.mini.java_core.dto.ResponseDTO;
import com.mini.java_core.entity.ResponseHelper;
import com.mini.java_core.enums.ResponseMessage;
import com.mini.java_core.service.AbstractService;
import com.mini.workout_logger_backend.dto.ExerciseExecutionReadDTO;
import com.mini.workout_logger_backend.dto.ExerciseExecutionWriteDTO;
import com.mini.workout_logger_backend.dto.SetReadDTO;
import com.mini.workout_logger_backend.dto.SetWriteDTO;
import com.mini.workout_logger_backend.entity.ExerciseExecution;
import com.mini.workout_logger_backend.entity.Set;
import com.mini.workout_logger_backend.mapper.ExerciseExecutionMapper;
import com.mini.workout_logger_backend.mapper.SetMapper;
import com.mini.workout_logger_backend.repository.ExerciseExecutionRepository;
import com.mini.workout_logger_backend.repository.SetRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExerciseExecutionService extends AbstractService<ExerciseExecution,
                                                              ExerciseExecutionReadDTO,
                                                              ExerciseExecutionWriteDTO,
                                                              ExerciseExecutionMapper,
                                                              ExerciseExecutionRepository> {

    @Autowired
    private SetMapper setMapper;

    @Autowired
    private SetRepository setRepository;

    public ResponseEntity<ResponseDTO<SetReadDTO>> listSets(Long executionId) {
        ExerciseExecution execution = repository.safeFindById(executionId);
        return ResponseHelper.success(HttpStatus.OK,
                ResponseMessage.ENTITIES_FOUND.getMessage(),
                setMapper.toDTO(execution.getSets()));
    }

    public ResponseEntity<ResponseDTO<SetReadDTO>> getSetById(Long executionId, Long setId) {
        ExerciseExecution execution = repository.safeFindById(executionId);
        Set set = setRepository.safeFindById(setId);
        if (!execution.getSets().contains(set)) {
            return ResponseHelper.error(HttpStatus.NOT_FOUND,
                    ResponseMessage.ENTITY_DOES_NOT_BELONG_TO_PARENT.getMessage(),
                    List.of());
        }
        return ResponseHelper.success(HttpStatus.OK,
                ResponseMessage.ENTITY_FOUND.getMessage(),
                List.of(setMapper.toDTO(set)));
    }

    public ResponseEntity<ResponseDTO<SetWriteDTO>> createSet(Long executionId, @Valid SetWriteDTO dto) {
        ExerciseExecution execution = repository.safeFindById(executionId);
        Set set = setMapper.toEntity(dto);
        execution.addSet(set);
        ExerciseExecution savedExecution = repository.save(execution);
        return ResponseHelper.success(HttpStatus.CREATED,
                ResponseMessage.ENTITY_CREATED.getMessage(),
                savedExecution.getSets().stream()
                        .map(s -> setMapper.toDTO(s, SetWriteDTO.class))
                        .toList());
    }

    public ResponseEntity<ResponseDTO<SetReadDTO>> updateSet(Long executionId, Long setId, @Valid SetWriteDTO dto) {
        ExerciseExecution execution = repository.safeFindById(executionId);
        Set set = setRepository.safeFindById(setId);
        if (!execution.getSets().contains(set)) {
            return ResponseHelper.error(HttpStatus.NOT_FOUND,
                    ResponseMessage.ENTITY_DOES_NOT_BELONG_TO_PARENT.getMessage(),
                    List.of());
        }
        setMapper.getMapper().map(dto, set);
        repository.save(execution);
        return ResponseHelper.success(HttpStatus.OK,
                ResponseMessage.ENTITY_UPDATED.getMessage(),
                List.of(setMapper.toDTO(set)));
    }

    public ResponseEntity<ResponseDTO<Void>> deleteSet(Long executionId, Long setId) {
        ExerciseExecution execution = repository.safeFindById(executionId);
        Set set = setRepository.safeFindById(setId);
        if (!execution.getSets().contains(set)) {
            return ResponseHelper.error(HttpStatus.NOT_FOUND,
                    ResponseMessage.ENTITY_DOES_NOT_BELONG_TO_PARENT.getMessage(),
                    List.of());
        }
        execution.removeSet(set);
        repository.save(execution);
        return ResponseHelper.success(HttpStatus.OK,
                ResponseMessage.ENTITY_DELETED.getMessage(),
                null);
    }

}
