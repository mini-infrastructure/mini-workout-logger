package com.mini.workout_logger_backend.controller;

import com.mini.java_core.controller.AbstractController;
import com.mini.java_core.dto.ResponseDTO;
import com.mini.workout_logger_backend.dto.ExerciseExecutionReadDTO;
import com.mini.workout_logger_backend.dto.ExerciseExecutionWriteDTO;
import com.mini.workout_logger_backend.dto.SetReadDTO;
import com.mini.workout_logger_backend.dto.SetWriteDTO;
import com.mini.workout_logger_backend.entity.ExerciseExecution;
import com.mini.workout_logger_backend.mapper.ExerciseExecutionMapper;
import com.mini.workout_logger_backend.repository.ExerciseExecutionRepository;
import com.mini.workout_logger_backend.service.ExerciseExecutionService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/exercise-executions")
@Tag(name = "Exercise Execution", description = "Exercise Execution API")
public class ExerciseExecutionController extends AbstractController<ExerciseExecution,
                                                                    ExerciseExecutionReadDTO,
                                                                    ExerciseExecutionWriteDTO,
                                                                    ExerciseExecutionMapper,
                                                                    ExerciseExecutionRepository,
                                                                    ExerciseExecutionService> {

    @GetMapping("/{id}/sets")
    public ResponseEntity<ResponseDTO<SetReadDTO>> listSets(@PathVariable("id") Long id) {
        return service.listSets(id);
    }

    @GetMapping("/{id}/sets/{setId}")
    public ResponseEntity<ResponseDTO<SetReadDTO>> getSetById(@PathVariable("id") Long id,
                                                              @PathVariable("setId") Long setId) {
        return service.getSetById(id, setId);
    }

    @PostMapping("/{id}/sets")
    public ResponseEntity<ResponseDTO<SetWriteDTO>> createSet(@PathVariable("id") Long id,
                                                             @RequestBody SetWriteDTO dto) {
        return service.createSet(id, dto);
    }

    @PutMapping("/{id}/sets/{setId}")
    public ResponseEntity<ResponseDTO<SetReadDTO>> updateSet(@PathVariable("id") Long id,
                                                             @PathVariable("setId") Long setId,
                                                             @RequestBody SetWriteDTO dto) {
        return service.updateSet(id, setId, dto);
    }

    @DeleteMapping("/{id}/sets/{setId}")
    public ResponseEntity<ResponseDTO<Void>> deleteSet(@PathVariable("id") Long id,
                                                       @PathVariable("setId") Long setId) {
        return service.deleteSet(id, setId);
    }

}

