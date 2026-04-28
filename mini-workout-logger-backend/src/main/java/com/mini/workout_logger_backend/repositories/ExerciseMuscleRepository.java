package com.mini.workout_logger_backend.repositories;

import com.mini.java_core.repository.AbstractRepository;
import com.mini.workout_logger_backend.entities.ExerciseMuscle;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExerciseMuscleRepository extends AbstractRepository<ExerciseMuscle> {

    /**
     * For each exercise that shares at least one (muscle, role) pair with the reference
     * exercise, returns a two-element array: [exerciseId (Long), matchCount (Long)].
     *
     * The reference exercise itself is excluded from the results.
     */
    @Query("""
            SELECT em.exercise.id, COUNT(em)
            FROM ExerciseMuscle em
            WHERE em.exercise.id <> :referenceId
              AND EXISTS (
                  SELECT 1 FROM ExerciseMuscle ref
                  WHERE ref.exercise.id = :referenceId
                    AND ref.muscle.id   = em.muscle.id
                    AND ref.role        = em.role
              )
            GROUP BY em.exercise.id
            """)
    List<Object[]> findMatchingExerciseIdsAndCounts(@Param("referenceId") Long referenceId);

    /**
     * Total number of (muscle, role) pairs belonging to the given exercise.
     * Used as the denominator when computing recommendation scores.
     */
    @Query("SELECT COUNT(em) FROM ExerciseMuscle em WHERE em.exercise.id = :exerciseId")
    long countByExerciseId(@Param("exerciseId") Long exerciseId);

}
