package com.mini.workout_logger_backend.repositories;

import com.mini.java_core.repository.AbstractRepository;
import com.mini.workout_logger_backend.entities.WorkoutExerciseExecution;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WorkoutExerciseExecutionRepository extends AbstractRepository<WorkoutExerciseExecution> {

    @Query("""
            SELECT wee FROM WorkoutExerciseExecution wee
            JOIN FETCH wee.workoutExercise we
            JOIN FETCH wee.workoutExecution wex
            JOIN FETCH wex.workout w
            LEFT JOIN FETCH wee.setExecutions
            WHERE we.exercise.id = :exerciseId
            ORDER BY wex.interval.start DESC
            """)
    List<WorkoutExerciseExecution> findAllByExerciseIdOrderByDateDesc(@Param("exerciseId") Long exerciseId);

}
