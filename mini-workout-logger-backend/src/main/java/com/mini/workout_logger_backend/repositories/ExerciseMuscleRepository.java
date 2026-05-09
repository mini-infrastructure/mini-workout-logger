package com.mini.workout_logger_backend.repositories;

import com.mini.java_core.repository.AbstractRepository;
import com.mini.workout_logger_backend.entities.ExerciseMuscle;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ExerciseMuscleRepository extends AbstractRepository<ExerciseMuscle> {

    /**
     * For each exercise that shares at least one primary (muscle, role) pair with the
     * reference exercise, returns a two-element array: [exerciseId (Long), matchCount (Long)].
     *
     * Only TARGET, AGONIST and SYNERGIST roles are considered. Generic stabilizer/antagonist
     * roles are excluded because they are shared by many unrelated exercises (e.g. core
     * stabilizers appear in both Cable Fly and Smith Squat), which would produce false positives.
     *
     * The reference exercise itself is excluded from the results.
     */
    @Modifying
    @Transactional
    @Query("DELETE FROM ExerciseMuscle em WHERE em.exercise.id = :exerciseId")
    void deleteAllByExerciseId(@Param("exerciseId") Long exerciseId);

    @Query("""
            SELECT em.exercise.id, COUNT(em)
            FROM ExerciseMuscle em
            WHERE em.exercise.id <> :referenceId
              AND em.role IN (
                  com.mini.workout_logger_backend.enums.ExerciseMuscleMovementClassification.TARGET,
                  com.mini.workout_logger_backend.enums.ExerciseMuscleMovementClassification.AGONIST,
                  com.mini.workout_logger_backend.enums.ExerciseMuscleMovementClassification.SYNERGIST
              )
              AND EXISTS (
                  SELECT 1 FROM ExerciseMuscle ref
                  WHERE ref.exercise.id = :referenceId
                    AND ref.muscle.id   = em.muscle.id
                    AND ref.role        = em.role
                    AND ref.role IN (
                        com.mini.workout_logger_backend.enums.ExerciseMuscleMovementClassification.TARGET,
                        com.mini.workout_logger_backend.enums.ExerciseMuscleMovementClassification.AGONIST,
                        com.mini.workout_logger_backend.enums.ExerciseMuscleMovementClassification.SYNERGIST
                    )
              )
            GROUP BY em.exercise.id
            """)
    List<Object[]> findMatchingExerciseIdsAndCounts(@Param("referenceId") Long referenceId);

    /**
     * Total number of primary (muscle, role) pairs (TARGET, AGONIST, SYNERGIST) for the
     * given exercise. Used as the denominator when computing recommendation scores.
     * Must use the same role restriction as findMatchingExerciseIdsAndCounts so that
     * scores are comparable (a perfect match scores 1.0).
     */
    @Query("""
            SELECT COUNT(em) FROM ExerciseMuscle em
            WHERE em.exercise.id = :exerciseId
              AND em.role IN (
                  com.mini.workout_logger_backend.enums.ExerciseMuscleMovementClassification.TARGET,
                  com.mini.workout_logger_backend.enums.ExerciseMuscleMovementClassification.AGONIST,
                  com.mini.workout_logger_backend.enums.ExerciseMuscleMovementClassification.SYNERGIST
              )
            """)
    long countByExerciseId(@Param("exerciseId") Long exerciseId);

}
