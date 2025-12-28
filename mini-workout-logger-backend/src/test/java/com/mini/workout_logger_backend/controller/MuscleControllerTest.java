package com.mini.workout_logger_backend.controller;

import com.mini.java_core.AbstractCrudControllerTest;
import com.mini.workout_logger_backend.dto.MuscleDTO;
import com.mini.workout_logger_backend.entity.Muscle;
import com.mini.workout_logger_backend.mapper.MuscleMapper;
import com.mini.workout_logger_backend.repository.MuscleRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

import java.util.List;
import java.util.Set;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class MuscleControllerTest extends AbstractCrudControllerTest<Muscle,
                                                              MuscleDTO,
                                                              MuscleMapper,
                                                              MuscleRepository> {

    @Override
    protected String getBaseUrl() {
        return "/muscles";
    }

    @Override
    protected List<MuscleDTO> getTestDtos() {
        return List.of(
                new MuscleDTO("Biceps"),
                new MuscleDTO("Triceps"),
                new MuscleDTO("Deltoids")
        );
    }

    @Test
    void associations() throws Exception {
        // Muscle 1:n Exercise.
        MuscleDTO muscleGroupDTO = new MuscleDTO("Arms");
        Muscle savedMuscleGroup = this.repository().save(this.mapper().toEntity(muscleGroupDTO));

        MuscleDTO muscleDTO = new MuscleDTO("Biceps", Set.of(this.mapper().toDTO(savedMuscleGroup)));
        Muscle savedMuscle = this.repository().save(this.mapper().toEntity(muscleDTO));

        mockMvc.perform(get(getBaseUrl() + "/{id}", savedMuscle.getId())
                .queryParam("lang", "pt_BR")
                .accept(MediaType.ALL_VALUE))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].muscle_groups.length()").value(1))
                .andExpect(jsonPath("$.data[0].muscle_groups[0].id").value(savedMuscleGroup.getId()))
                .andExpect(jsonPath("$.data[0].muscle_groups[0].name").value(savedMuscleGroup.getName().getValue()));
    }

}
