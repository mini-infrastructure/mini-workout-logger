package com.mini.workout_logger_backend.repositories;

import com.mini.java_core.repository.AbstractMediaRepository;
import com.mini.workout_logger_backend.entities.ExerciseMedia;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExerciseMediaRepository extends AbstractMediaRepository<ExerciseMedia> {

    List<ExerciseMedia> findAllByOwnerId(Long ownerId);

}
