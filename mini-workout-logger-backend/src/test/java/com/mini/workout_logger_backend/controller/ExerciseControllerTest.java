package com.mini.workout_logger_backend.controller;

import com.mini.java_core.AbstractCrudControllerTest;
import com.mini.workout_logger_backend.dto.ExerciseDTO;
import com.mini.workout_logger_backend.entity.Exercise;
import com.mini.workout_logger_backend.mapper.ExerciseMapper;
import com.mini.workout_logger_backend.repository.ExerciseRepository;

import java.util.List;

class ExerciseControllerTest extends AbstractCrudControllerTest<Exercise,
                                                                ExerciseDTO,
                                                                ExerciseMapper,
                                                                ExerciseRepository> {

    @Override
    protected String getBaseUrl() {
        return "/exercises";
    }

    @Override
    protected List getTestDtos() {
        return List.of(
                new ExerciseDTO("Chest Fly"),
                new ExerciseDTO("Push-Up"),
                new ExerciseDTO("Squat")
        );
    }

}
