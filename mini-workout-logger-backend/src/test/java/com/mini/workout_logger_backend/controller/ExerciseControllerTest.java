package com.mini.workout_logger_backend.controller;

import com.mini.workout_logger_backend.AbstractIntegrationTest;
import com.mini.workout_logger_backend.dto.ExerciseDTO;
import com.mini.workout_logger_backend.entity.Exercise;
import com.mini.workout_logger_backend.mapper.ExerciseMapper;
import com.mini.workout_logger_backend.repository.ExerciseRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
class ExerciseControllerTest extends AbstractIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Autowired
    private ExerciseMapper exerciseMapper;

    private final ExerciseDTO TEST_EXERCISE_DTO = new ExerciseDTO("Chest Fly");

    @BeforeEach
    void clean() {
        exerciseRepository.deleteAll();
    }

    @Test
    void _get() throws Exception {
        // Data.
        final Exercise savedExercise = exerciseRepository.save(this.exerciseMapper.toEntity(TEST_EXERCISE_DTO));

        // Perform.
        mockMvc.perform(get("/exercises/{id}", savedExercise.getId())
                        .queryParam("lang", "pt_BR")
                        .accept(MediaType.ALL_VALUE))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].name").value(savedExercise.getName().getValue()));
    }

    @Test
    void _list() throws Exception {
        // Data.
        List<ExerciseDTO> exercises = List.of(
                new ExerciseDTO("Deadlift"),
                new ExerciseDTO("Squat"),
                new ExerciseDTO("Bench Press")
        );
        exercises.forEach(dto -> exerciseRepository.save(this.exerciseMapper.toEntity(dto)));

        // Perform.
        mockMvc.perform(get("/exercises")
                        .queryParam("lang", "pt_BR")
                        .accept(MediaType.ALL_VALUE))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.length()").value(exercises.size()));
    }

    @Test
    void _create() throws Exception {
        // Perform.
        mockMvc.perform(post("/exercises")
                        .queryParam("lang", "pt_BR")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.ALL_VALUE)
                        .content(exerciseMapper.toString(TEST_EXERCISE_DTO)))
                .andDo(print())
                .andExpect(status().isCreated());

        // Verify.
        assertThat(exerciseRepository.count()).isEqualTo(1);
    }

    @Test
    void _update() throws Exception {
        // Data.
        final Exercise savedExercise = exerciseRepository.save(this.exerciseMapper.toEntity(TEST_EXERCISE_DTO));

        // Update.
        final ExerciseDTO exerciseDto = new ExerciseDTO("Fly");

        // Perform.
        mockMvc.perform(put("/exercises/{id}", savedExercise.getId())
                        .queryParam("lang", "pt_BR")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.ALL_VALUE)
                        .content(exerciseMapper.toString(exerciseDto)))
                .andDo(print())
                .andExpect(status().isOk());

        // Verify.
        final Exercise updatedExercise = exerciseRepository.findById(savedExercise.getId()).orElseThrow();
        assertThat(updatedExercise.getName().getValue()).isEqualTo(exerciseDto.getName());
    }

    @Test
    void _delete() throws Exception {
        // Data.
        final Exercise savedExercise = exerciseRepository.save(this.exerciseMapper.toEntity(TEST_EXERCISE_DTO));

        // Perform.
        mockMvc.perform(delete("/exercises/{id}", savedExercise.getId())
                        .queryParam("lang", "pt_BR")
                        .accept(MediaType.ALL_VALUE))
                .andDo(print())
                .andExpect(status().isOk());

        // Verify.
        assertThat(exerciseRepository.existsById(savedExercise.getId())).isFalse();
    }

}
