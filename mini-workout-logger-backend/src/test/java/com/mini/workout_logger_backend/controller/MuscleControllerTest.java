package com.mini.workout_logger_backend.controller;

import com.mini.workout_logger_backend.AbstractIntegrationTest;
import com.mini.workout_logger_backend.dto.MuscleDTO;
import com.mini.workout_logger_backend.entity.Muscle;
import com.mini.workout_logger_backend.mapper.MuscleMapper;
import com.mini.workout_logger_backend.repository.MuscleRepository;
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
class MuscleControllerTest extends AbstractIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private MuscleRepository muscleRepository;

    @Autowired
    private MuscleMapper muscleMapper;

    private final MuscleDTO TEST_MUSCLE_DTO = new MuscleDTO("Biceps", null);

    @BeforeEach
    void clean() {
        muscleRepository.deleteAll();
    }

    @Test
    void _get() throws Exception {
        // Data.
        final Muscle savedMuscle = muscleRepository.save(this.muscleMapper.toEntity(TEST_MUSCLE_DTO));

        // Perform.
        mockMvc.perform(get("/muscles/{id}", savedMuscle.getId())
                        .queryParam("lang", "pt_BR")
                        .accept(MediaType.ALL_VALUE))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].name").value(savedMuscle.getName().getValue()));
    }

    @Test
    void _list() throws Exception {
        // Data.
        List<MuscleDTO> muscles = List.of(
                new MuscleDTO("Biceps", null),
                new MuscleDTO("Triceps", null),
                new MuscleDTO("Deltoids", null)
        );
        muscles.forEach(dto -> muscleRepository.save(this.muscleMapper.toEntity(dto)));

        // Perform.
        mockMvc.perform(get("/muscles")
                .queryParam("lang", "pt_BR")
                .accept(MediaType.ALL_VALUE))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.length()").value(muscles.size()));
    }

    @Test
    void _create() throws Exception {
        // Perform.
        mockMvc.perform(post("/muscles")
                .queryParam("lang", "pt_BR")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.ALL_VALUE)
                .content(muscleMapper.toString(TEST_MUSCLE_DTO)))
                .andDo(print())
                .andExpect(status().isCreated());

        // Verify.
        assertThat(muscleRepository.count()).isEqualTo(1);
    }

    @Test
    void _update() throws Exception {
        // Data.
        final Muscle savedMuscle = muscleRepository.save(this.muscleMapper.toEntity(TEST_MUSCLE_DTO));

        // Update.
        final MuscleDTO muscleDto = new MuscleDTO("Triceps", null);

        // Perform.
        mockMvc.perform(put("/muscles/{id}", savedMuscle.getId())
                .queryParam("lang", "pt_BR")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.ALL_VALUE)
                .content(muscleMapper.toString(muscleDto)))
                .andDo(print())
                .andExpect(status().isOk());

        // Verify.
        final Muscle updatedMuscle = muscleRepository.findById(savedMuscle.getId()).orElseThrow();
        assertThat(updatedMuscle.getName().getValue()).isEqualTo("Triceps");
    }

    @Test
    void _delete() throws Exception {
        // Data.
        final Muscle savedMuscle = muscleRepository.save(this.muscleMapper.toEntity(TEST_MUSCLE_DTO));

        // Perform.
        mockMvc.perform(delete("/muscles/{id}", savedMuscle.getId())
                .queryParam("lang", "pt_BR")
                .accept(MediaType.ALL_VALUE))
                .andDo(print())
                .andExpect(status().isOk());

        // Verify.
        assertThat(muscleRepository.existsById(savedMuscle.getId())).isFalse();
    }

}
