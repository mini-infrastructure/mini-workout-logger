package com.mini.workout_logger_backend.controller;

import com.mini.java_core.AbstractCrudControllerTest;
import com.mini.workout_logger_backend.dto.ExerciseExecutionReadDTO;
import com.mini.workout_logger_backend.dto.ExerciseExecutionWriteDTO;
import com.mini.workout_logger_backend.dto.ExerciseWriteDTO;
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

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class ExerciseExecutionControllerTest extends AbstractCrudControllerTest<ExerciseExecution,
                                                                         ExerciseExecutionReadDTO,
                                                                         ExerciseExecutionWriteDTO,
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
    protected List<ExerciseExecutionWriteDTO> getWriteDtos() {
        return savedExercises.stream()
                .map(ex -> {
                    ExerciseExecutionWriteDTO dto =
                            new ExerciseExecutionWriteDTO();
                    dto.setExerciseId(ex.getId());
                    return dto;
                })
                .toList();
    }

    @Override
    protected void afterCreate(ExerciseExecutionReadDTO dto) {
        assertThat(dto.getExercise()).isNotNull();
        boolean exists =
                savedExercises.stream()
                        .anyMatch(ex -> ex.getId().equals(dto.getExercise().getId()));
        assertThat(exists).isTrue();
    }

    @BeforeEach
    void setupExercises() {
        exerciseRepository.deleteAll();

        savedExercises = List.of(
                exerciseRepository.save(exerciseMapper.toEntity(new ExerciseWriteDTO("Push-Up"))),
                exerciseRepository.save(exerciseMapper.toEntity(new ExerciseWriteDTO("Squat"))),
                exerciseRepository.save(exerciseMapper.toEntity(new ExerciseWriteDTO("Plank"))));
    }

    @Test
    void associations() throws Exception {
        ExerciseExecutionWriteDTO writeDTO =
                new ExerciseExecutionWriteDTO(savedExercises.getFirst().getId());

        ExerciseExecution saved =
                repository().save(mapper().toEntity(writeDTO));

        mockMvc.perform(get(getBaseUrl() + "/{id}", saved.getId())
                        .queryParam("lang", "pt_BR")
                        .accept(MediaType.ALL_VALUE))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].exercise.id")
                        .value(savedExercises.getFirst().getId()))
                .andExpect(jsonPath("$.data[0].exercise.name")
                        .value(savedExercises.getFirst()
                                .getName()
                                .getValue()));
    }

}