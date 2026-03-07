package com.mini.workout_logger_backend.services;

import com.mini.java_core.dto.ResponseDTO;
import com.mini.java_core.entity.ResponseHelper;
import com.mini.java_core.enums.ResponseMessage;
import com.mini.java_core.service.AbstractService;
import com.mini.workout_logger_backend.dtos.ExerciseReadDTO;
import com.mini.workout_logger_backend.dtos.ExerciseWriteDTO;
import com.mini.workout_logger_backend.dtos.MuscleReadDTO;
import com.mini.workout_logger_backend.entities.Exercise;
import com.mini.workout_logger_backend.entities.ExerciseMuscle;
import com.mini.workout_logger_backend.entities.Muscle;
import com.mini.workout_logger_backend.enums.ExerciseEquipment;
import com.mini.workout_logger_backend.mappers.ExerciseMapper;
import com.mini.workout_logger_backend.repositories.ExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toCollection;

@Service
public class ExerciseService extends AbstractService<Exercise,
                                                     ExerciseReadDTO,
                                                     ExerciseWriteDTO,
                                                     ExerciseMapper,
                                                     ExerciseRepository> {

    @Autowired
    MuscleService muscleService;

    // Todo: Get all filtered and paginates!!!

    @Override
    public Exercise beforeSave(Exercise entity) {
        // Given a muscle described at `exerciseMuscles`, adds all its parent muscles as well, with the same role.
        for (Muscle muscle : entity.getMuscles()) {
            for (Muscle parent : muscleService.findParentMusclesRecursive(muscle, new java.util.HashSet<>())) {
                boolean alreadyExists = entity.getMuscles()
                        .stream()
                        .anyMatch(m -> m.equals(parent));

                if (!alreadyExists) {
                    entity.addMuscle(parent, entity.roleOf(muscle));
                }
            }
        }

        // Replaces the equipments set.
        if (entity.getEquipments() != null) {
            Set<ExerciseEquipment> newEquipments = new HashSet<>(entity.getEquipments());
            entity.setEquipments(newEquipments);
        }

        return super.beforeSave(entity);
    }

    public ExerciseReadDTO afterLoad(ExerciseReadDTO dto) {
        dto.setRootMuscles(getExerciseRootMusclesOrderedByRelevance(dto.getId()));
        return super.afterLoad(dto);
    }

    public Set<String> getExerciseRootMusclesOrderedByRelevance(Long exerciseId) {
        Exercise exercise = this.repository.safeFindById(exerciseId);
        Set<Muscle> muscles = exercise.getMuscles();
        Set<Muscle> rootMuscles = muscleService.findRootMuscles(muscles);

        Map<Muscle, Long> scores = new HashMap<>();
        for (Muscle rootMuscle : rootMuscles) {
            Set<Muscle> children = muscleService.findChildMusclesRecursive(rootMuscle, new java.util.HashSet<>());
            long score = children.stream().filter(muscles::contains).count();
            scores.put(rootMuscle, score);
        }
        return scores.entrySet()
                .stream()
                .sorted((e1, e2) ->
                        Long.compare(e2.getValue(), e1.getValue()))
                .map(entry -> entry.getKey()
                        .getName()
                        .getValue())
                .collect(toCollection(LinkedHashSet::new));
    }

}
