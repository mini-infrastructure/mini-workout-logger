package com.mini.workout_logger_backend.services;

import com.mini.java_core.dto.ResponseDTO;
import com.mini.java_core.entity.ResponseHelper;
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

import java.util.Set;
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

}
