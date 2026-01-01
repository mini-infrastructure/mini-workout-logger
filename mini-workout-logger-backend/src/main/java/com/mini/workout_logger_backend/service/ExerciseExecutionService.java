package com.mini.workout_logger_backend.service;

import com.mini.java_core.dto.ResponseDTO;
import com.mini.java_core.entity.ResponseHelper;
import com.mini.java_core.enums.ResponseMessage;
import com.mini.java_core.service.AbstractService;
import com.mini.java_core.service.MessageService;
import com.mini.workout_logger_backend.dto.*;
import com.mini.workout_logger_backend.entity.ExerciseExecution;
import com.mini.workout_logger_backend.entity.Set;
import com.mini.workout_logger_backend.mapper.ExerciseExecutionMapper;
import com.mini.workout_logger_backend.mapper.SetMapper;
import com.mini.workout_logger_backend.repository.ExerciseExecutionRepository;
import com.mini.workout_logger_backend.repository.SetRepository;
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

    @Autowired
    private MessageService messageService;

    public ResponseEntity<ResponseDTO<SetReadDTO>> listSets(Long executionId) {
        ExerciseExecution execution = repository.safeFindById(executionId);
        return ResponseHelper.success(HttpStatus.OK,
                ResponseMessage.ENTITIES_FOUND.getMessage(),
                setMapper.toDTO(execution.getSets()));
    }

    public ResponseEntity<ResponseDTO<SetReadDTO>> getSetById(Long executionId,
                                                              Long setId) {
        ExerciseExecution execution = repository.safeFindById(executionId);
        Set set = setRepository.safeFindById(setId);
        if (!execution.getSets().contains(set)) {
            return ResponseHelper.error(HttpStatus.CONFLICT,
                    ResponseMessage.ENTITY_DOES_NOT_BELONG_TO_PARENT.getMessage(),
                    List.of());
        }
        return ResponseHelper.success(HttpStatus.OK,
                ResponseMessage.ENTITY_FOUND.getMessage(),
                List.of(setMapper.toDTO(set)));
    }

    public ResponseEntity<ResponseDTO<SetReadDTO>> createSet(Long executionId,
                                                             SetWriteDTO dto) {
        ExerciseExecution execution = repository.safeFindById(executionId);
        Set set = setMapper.toEntity(dto);
        execution.addSet(set);
        ExerciseExecution savedExecution = repository.save(execution);
        return ResponseHelper.success(HttpStatus.CREATED,
                ResponseMessage.ENTITY_CREATED.getMessage(),
                setMapper.toDTO(savedExecution.getSets()));
    }

    public ResponseEntity<ResponseDTO<SetReadDTO>> updateSet(Long executionId,
                                                             Long setId,
                                                             SetWriteDTO dto) {
        ExerciseExecution execution = repository.safeFindById(executionId);
        Set set = setRepository.safeFindById(setId);
        if (!execution.getSets().contains(set)) {
            return ResponseHelper.error(HttpStatus.CONFLICT,
                    ResponseMessage.ENTITY_DOES_NOT_BELONG_TO_PARENT.getMessage(),
                    List.of());
        }
        setMapper.getMapper().map(dto, set);
        repository.save(execution);
        return ResponseHelper.success(HttpStatus.OK,
                ResponseMessage.ENTITY_UPDATED.getMessage(),
                List.of(setMapper.toDTO(set)));
    }

    public ResponseEntity<ResponseDTO<SetReadDTO>> reorderSet(Long executionId,
                                                              Long setId,
                                                              SetReorderDTO dto) {
        ExerciseExecution execution = repository.safeFindById(executionId);
        Set set = setRepository.safeFindById(setId);
        if (!execution.getSets().contains(set)) {
            return ResponseHelper.error(HttpStatus.CONFLICT,
                    ResponseMessage.ENTITY_DOES_NOT_BELONG_TO_PARENT.getMessage(),
                    List.of());
        }

        int oldIndex = execution.getSets().indexOf(set);
        int newIndex = dto.getNewPosition();

        if (oldIndex == newIndex) {
            return ResponseHelper.success(HttpStatus.OK,
                    ResponseMessage.ENTITY_UNCHANGED.getMessage(),
                    setMapper.toDTO(execution.getSets()));
        }

        if (newIndex < 0 || newIndex >= execution.getSets().size()) {
            return ResponseHelper.error(HttpStatus.BAD_REQUEST,
                    messageService.getLocalizedMessage("error.position_out_of_bounds"),
                    List.of());
        }

        execution.reorderSet(set, dto.getNewPosition());
        ExerciseExecution savedExecution = repository.save(execution);

        return ResponseHelper.success(HttpStatus.OK,
                ResponseMessage.ENTITY_UPDATED.getMessage(),
                setMapper.toDTO(savedExecution.getSets()));
    }

    public ResponseEntity<ResponseDTO<Void>> deleteAllSets(Long executionId) {
        ExerciseExecution execution = repository.safeFindById(executionId);
        execution.getSets().clear();
        repository.save(execution);
        return ResponseHelper.success(HttpStatus.OK,
                ResponseMessage.ENTITY_DELETED.getMessage(),
                null);
    }

    public ResponseEntity<ResponseDTO<Void>> deleteSet(Long executionId, Long setId) {
        ExerciseExecution execution = repository.safeFindById(executionId);
        Set set = setRepository.safeFindById(setId);
        if (!execution.getSets().contains(set)) {
            return ResponseHelper.error(HttpStatus.CONFLICT,
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