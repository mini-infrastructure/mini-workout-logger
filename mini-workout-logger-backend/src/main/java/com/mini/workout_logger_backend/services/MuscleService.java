package com.mini.workout_logger_backend.services;

import com.mini.java_core.dto.ResponseDTO;
import com.mini.java_core.entity.ResponseHelper;
import com.mini.java_core.entity.Text;
import com.mini.java_core.enums.ResponseMessage;
import com.mini.java_core.service.AbstractService;
import com.mini.workout_logger_backend.dtos.MuscleReadDTO;
import com.mini.workout_logger_backend.dtos.MuscleWriteDTO;
import com.mini.workout_logger_backend.entities.Muscle;
import com.mini.workout_logger_backend.mappers.MuscleMapper;
import com.mini.workout_logger_backend.repositories.MuscleRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class MuscleService extends AbstractService<Muscle,
                                                   MuscleReadDTO,
                                                   MuscleWriteDTO,
                                                   MuscleMapper,
                                                   MuscleRepository> {

    public Set<Muscle> findParentMusclesRecursive(Muscle muscle, Set<Muscle> parents) {
        if (muscle.getMuscleGroups() != null) {
            for (Muscle parent : muscle.getMuscleGroups()) {
                if (parents.add(parent)) {
                    findParentMusclesRecursive(parent, parents);
                }
            }
        }
        return parents;
    }

    public Set<Muscle> findChildMusclesRecursive(Muscle muscle, Set<Muscle> children) {
        if (muscle == null) {
            return children;
        }
        if (!children.add(muscle)) {
            return children;
        }
        if (muscle.getMuscles() != null && !muscle.getMuscles().isEmpty()) {
            for (Muscle child : muscle.getMuscles()) {
                findChildMusclesRecursive(child, children);
            }
        }
        return children;
    }

    public Set<Muscle> findRootMuscles(Set<Muscle> muscles) {
        Set<Muscle> rootMuscles = new LinkedHashSet<>();
        for (Muscle muscle : muscles) {
            Set<Muscle> parents = findParentMusclesRecursive(muscle, new HashSet<>());
            if (parents.isEmpty()) {
                rootMuscles.add(muscle);
            }
        }
        return rootMuscles;
    }

    public Set<Muscle> findRootMuscles() {
        return findRootMuscles(new HashSet<>(repository.findAll()));
    }

    public Set<String> findRootMuscleCodesOrderedByRelevance(Set<Muscle> muscles) {
        Set<Muscle> rootMuscles = findRootMuscles(muscles);
        Map<Muscle, Long> scores = new HashMap<>();
        for (Muscle rootMuscle : rootMuscles) {
            Set<Muscle> children = findChildMusclesRecursive(rootMuscle, new HashSet<>());
            long score = children.stream().filter(muscles::contains).count();
            scores.put(rootMuscle, score);
        }
        return scores.entrySet().stream()
                .sorted((e1, e2) -> Long.compare(e2.getValue(), e1.getValue()))
                .map(e -> e.getKey().getName().getCode())
                .collect(java.util.stream.Collectors.toCollection(java.util.LinkedHashSet::new));
    }

    public ResponseEntity<ResponseDTO<MuscleReadDTO>> getParentMuscles(Long muscleId) {
        Muscle muscle = repository.safeFindById(muscleId);
        Set<Muscle> parentMuscles = findParentMusclesRecursive(muscle, new java.util.HashSet<>());
        return ResponseHelper.success(
                HttpStatus.OK,
                ResponseMessage.ENTITIES_FOUND.getMessage(),
                parentMuscles.stream()
                             .map(mapper::toDTO)
                             .collect(Collectors.toList()));
    }

    public ResponseEntity<ResponseDTO<String>> getRootMuscles() {
        Set<Muscle> rootMuscles = findRootMuscles();
        return ResponseHelper.success(
                HttpStatus.OK,
                ResponseMessage.ENTITIES_FOUND.getMessage(),
                rootMuscles.stream()
                        .map(muscle -> muscle.getName().getValue())
                        .collect(Collectors.toList()));
    }

}
