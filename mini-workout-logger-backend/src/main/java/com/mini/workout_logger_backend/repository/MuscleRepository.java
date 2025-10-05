package com.mini.workout_logger_backend.repository;

import com.mini.java_core.repository.AbstractRepository;
import com.mini.workout_logger_backend.entity.Muscle;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface MuscleRepository extends AbstractRepository<Muscle> {

}
