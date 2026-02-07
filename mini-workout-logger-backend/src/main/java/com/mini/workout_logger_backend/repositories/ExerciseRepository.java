package com.mini.workout_logger_backend.repositories;

import com.mini.java_core.repository.AbstractRepository;
import com.mini.workout_logger_backend.entities.Exercise;
import org.springframework.stereotype.Repository;

@Repository
public interface ExerciseRepository extends AbstractRepository<Exercise> {

}
