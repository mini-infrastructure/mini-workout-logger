package com.mini.workout_logger_backend.services;

import com.mini.java_core.service.AbstractService;
import com.mini.workout_logger_backend.dtos.ExerciseReadDTO;
import com.mini.workout_logger_backend.dtos.ExerciseWriteDTO;
import com.mini.workout_logger_backend.entities.Exercise;
import com.mini.workout_logger_backend.entities.Muscle;
import com.mini.workout_logger_backend.mappers.ExerciseMapper;
import com.mini.workout_logger_backend.repositories.ExerciseRepository;
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
    public Exercise beforeSave(Exercise entity) {
        // Adds the muscle groups associated with the muscle.
        for (Muscle muscle : entity.getMuscles()) {
            for (Muscle parent : muscleService.findParentMusclesRecursive(muscle, new java.util.HashSet<>())) {
                entity.addMuscle(parent);
            }
        }

        return super.beforeSave(entity);
    }

}
