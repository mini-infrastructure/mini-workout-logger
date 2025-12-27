package com.mini.workout_logger_backend.controller;

import com.mini.java_core.AbstractCrudControllerTest;
import com.mini.workout_logger_backend.dto.MuscleDTO;
import com.mini.workout_logger_backend.entity.Muscle;
import com.mini.workout_logger_backend.mapper.MuscleMapper;
import com.mini.workout_logger_backend.repository.MuscleRepository;

import java.util.List;

class MuscleControllerTest extends AbstractCrudControllerTest<Muscle,
                                                              MuscleDTO,
                                                              MuscleMapper,
                                                              MuscleRepository> {

    @Override
    protected String getBaseUrl() {
        return "/muscles";
    }

    @Override
    protected List getTestDtos() {
        return List.of(
                new MuscleDTO("Biceps", null),
                new MuscleDTO("Triceps", null),
                new MuscleDTO("Deltoids", null)
        );
    }

}
