package com.mini.workout_logger_backend.repositories;

import com.mini.java_core.repository.AbstractMediaRepository;
import com.mini.workout_logger_backend.entities.ExerciseMedia;
import com.mini.workout_logger_backend.enums.ExerciseMediaRole;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExerciseMediaRepository extends AbstractMediaRepository<ExerciseMedia> {

    List<ExerciseMedia> findAllByOwnerId(Long ownerId);

    Optional<ExerciseMedia> findByOwnerIdAndRole(Long ownerId, ExerciseMediaRole role);

}
