package com.mini.workout_logger_backend.repositories;

import com.mini.java_core.repository.AbstractRepository;
import com.mini.workout_logger_backend.entities.WorkoutExecution;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface WorkoutExecutionRepository extends AbstractRepository<WorkoutExecution> {

    @Query("SELECT we FROM WorkoutExecution we ORDER BY we.interval.start DESC NULLS LAST")
    Page<WorkoutExecution> findAllSortedByDate(Pageable pageable);

}
