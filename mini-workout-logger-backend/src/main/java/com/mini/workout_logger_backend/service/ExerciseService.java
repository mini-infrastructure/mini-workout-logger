package com.mini.workout_logger_backend.service;

import com.mini.java_core.service.AbstractService;
import com.mini.workout_logger_backend.dto.ExerciseReadDTO;
import com.mini.workout_logger_backend.dto.ExerciseWriteDTO;
import com.mini.workout_logger_backend.entity.Exercise;
import com.mini.workout_logger_backend.entity.Muscle;
import com.mini.workout_logger_backend.mapper.ExerciseMapper;
import com.mini.workout_logger_backend.repository.ExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExerciseService extends AbstractService<Exercise,
                                                     ExerciseReadDTO,
                                                     ExerciseWriteDTO,
                                                     ExerciseMapper,
                                                     ExerciseRepository> {

    @Autowired
    MuscleService muscleService;

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

}
