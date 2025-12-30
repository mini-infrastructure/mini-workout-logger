package com.mini.workout_logger_backend.service;

import com.mini.java_core.dto.ResponseDTO;
import com.mini.java_core.entity.ResponseHelper;
import com.mini.java_core.enums.ResponseMessage;
import com.mini.java_core.service.AbstractService;
import com.mini.workout_logger_backend.dto.ExerciseExecutionReadDTO;
import com.mini.workout_logger_backend.dto.ExerciseReadDTO;
import com.mini.workout_logger_backend.dto.ExerciseWriteDTO;
import com.mini.workout_logger_backend.entity.Exercise;
import com.mini.workout_logger_backend.entity.Muscle;
import com.mini.workout_logger_backend.mapper.ExerciseExecutionMapper;
import com.mini.workout_logger_backend.mapper.ExerciseMapper;
import com.mini.workout_logger_backend.repository.ExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ExerciseService extends AbstractService<Exercise,
                                                     ExerciseReadDTO,
                                                     ExerciseWriteDTO,
                                                     ExerciseMapper,
                                                     ExerciseRepository> {

    @Autowired
    MuscleService muscleService;

    @Autowired
    ExerciseExecutionMapper executionMapper;

    @Override
    public Exercise transform(Exercise entity) {
        // Adds the muscle groups associated with the muscle.
        for (Muscle muscle : entity.getMuscles()) {
            for (Muscle parent : muscleService.findParentMusclesRecursive(muscle, new java.util.HashSet<>())) {
                entity.addMuscle(parent);
            }
        }

        return super.transform(entity);
    }

    public ResponseEntity<ResponseDTO<ExerciseExecutionReadDTO>> getExecutions(Long exerciseId) {
        Exercise exercise = repository.safeFindById(exerciseId);
        return ResponseHelper.success(HttpStatus.OK,
                ResponseMessage.ENTITIES_FOUND.getMessage(),
                executionMapper.toDTO(exercise.getExecutions())
        );
    }

}
