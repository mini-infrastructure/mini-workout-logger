package com.mini.workout_logger_backend.controller;

import com.mini.java_core.controller.AbstractController;
import com.mini.java_core.dto.ResponseDTO;
import com.mini.workout_logger_backend.dto.*;
import com.mini.workout_logger_backend.entity.ExerciseExecution;
import com.mini.workout_logger_backend.mapper.ExerciseExecutionMapper;
import com.mini.workout_logger_backend.repository.ExerciseExecutionRepository;
import com.mini.workout_logger_backend.service.ExerciseExecutionService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/exercise-executions")
@Tag(name = "Exercise Execution", description = "Exercise Execution API")
@Validated
public class ExerciseExecutionController extends AbstractController<ExerciseExecution,
                                                                    ExerciseExecutionReadDTO,
                                                                    ExerciseExecutionWriteDTO,
                                                                    ExerciseExecutionMapper,
                                                                    ExerciseExecutionRepository,
                                                                    ExerciseExecutionService> {

    @Tag(name = "Sets", description = "Manage Sets inside an Exercise Execution")
    @GetMapping("/{id}/sets")
    public ResponseEntity<ResponseDTO<SetReadDTO>> listSets(@PathVariable("id") @NotNull @Min(1L) Long id) {
        return service.listSets(id);
    }

    @Tag(name = "Sets")
    @GetMapping("/{id}/sets/{setId}")
    public ResponseEntity<ResponseDTO<SetReadDTO>> getSetById(@PathVariable("id") @NotNull @Min(1L) Long id,
                                                              @PathVariable("setId") @NotNull @Min(1L) Long setId) {
        return service.getSetById(id, setId);
    }

    @Tag(name = "Sets")
    @PostMapping("/{id}/sets")
    public ResponseEntity<ResponseDTO<SetReadDTO>> createSet(@PathVariable("id") @NotNull @Min(1L) Long id,
                                                             @Valid @RequestBody SetWriteDTO dto) {
        return service.createSet(id, dto);
    }

    @Tag(name = "Sets")
    @PutMapping("/{id}/sets/{setId}")
    public ResponseEntity<ResponseDTO<SetReadDTO>> updateSet(@PathVariable("id") @NotNull @Min(1L) Long id,
                                                             @PathVariable("setId") @NotNull @Min(1L) Long setId,
                                                             @Valid@RequestBody SetWriteDTO dto) {
        return service.updateSet(id, setId, dto);
    }

    @Tag(name = "Sets")
    @PutMapping("/{id}/sets/{setId}/reorder")
    public ResponseEntity<ResponseDTO<SetReadDTO>> reorderSet(@PathVariable("id") @NotNull @Min(1L) Long id,
                                                              @PathVariable("setId") @NotNull @Min(1L) Long setId,
                                                              @RequestBody SetReorderDTO setReorderDTO) {
        return service.reorderSet(id, setId, setReorderDTO);
    }

    @Tag(name = "Sets")
    @DeleteMapping("/{id}/sets")
    public ResponseEntity<ResponseDTO<Void>> deleteAllSets(@PathVariable("id") @NotNull @Min(1L) Long id) {
        return service.deleteAllSets(id);
    }

    @Tag(name = "Sets")
    @DeleteMapping("/{id}/sets/{setId}")
    public ResponseEntity<ResponseDTO<Void>> deleteSet(@PathVariable("id") @NotNull @Min(1L) Long id,
                                                       @PathVariable("setId") @NotNull @Min(1L) Long setId) {
        return service.deleteSet(id, setId);
    }

}
