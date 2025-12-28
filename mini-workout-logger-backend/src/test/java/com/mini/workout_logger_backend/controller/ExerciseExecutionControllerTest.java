package com.mini.workout_logger_backend.controller;

import com.mini.java_core.AbstractCrudControllerTest;
import com.mini.workout_logger_backend.dto.ExerciseDTO;
import com.mini.workout_logger_backend.dto.ExerciseExecutionDTO;
import com.mini.workout_logger_backend.entity.Exercise;
import com.mini.workout_logger_backend.entity.ExerciseExecution;
import com.mini.workout_logger_backend.mapper.ExerciseExecutionMapper;
import com.mini.workout_logger_backend.mapper.ExerciseMapper;
import com.mini.workout_logger_backend.repository.ExerciseExecutionRepository;
import com.mini.workout_logger_backend.repository.ExerciseRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

class ExerciseExecutionControllerTest extends AbstractCrudControllerTest<ExerciseExecution,
                                                                         ExerciseExecutionDTO,
                                                                         ExerciseExecutionMapper,
                                                                         ExerciseExecutionRepository> {

    @Autowired
    private ExerciseMapper exerciseMapper;

    @Autowired
    private ExerciseRepository exerciseRepository;

    private List<Exercise> savedExercises;

    @Override
    protected String getBaseUrl() {
        return "/exercise-executions";
    }

    @Override
    protected List<ExerciseExecutionDTO> getTestDtos() {
        return savedExercises.stream().map(ex -> {
            ExerciseExecutionDTO dto = new ExerciseExecutionDTO();
            dto.setExerciseId(ex.getId());
            return dto;
        }).toList();
    }

    @Override
    protected String createRequestBody(ExerciseExecutionDTO dto) {
        return """
        {
          "exercise_id": %d
        }
        """.formatted(dto.getExerciseId());
    }

    @Override
    protected void afterCreate(ExerciseExecutionDTO dto) throws Exception {
        // Asserts that the association with Exercise is correctly established.
        assertThat(dto.getExercise()).isNotNull();
        assertThat(savedExercises.stream().anyMatch(ex -> ex.getId().equals(dto.getExercise().getId()))).isTrue();
    }

    @BeforeEach
    void setupExercises() {
        this.exerciseRepository.deleteAll();

        this.savedExercises = List.of(
                exerciseRepository.save(exerciseMapper.toEntity(new ExerciseDTO("Push-Up"))),
                exerciseRepository.save(exerciseMapper.toEntity(new ExerciseDTO("Squat"))),
                exerciseRepository.save(exerciseMapper.toEntity(new ExerciseDTO("Plank")))
        );
    }

}