package com.mini.workout_logger_backend.controllers;

import com.mini.java_core.AbstractCrudControllerTest;
import com.mini.workout_logger_backend.dtos.MuscleReadDTO;
import com.mini.workout_logger_backend.dtos.MuscleWriteDTO;
import com.mini.workout_logger_backend.entities.Muscle;
import com.mini.workout_logger_backend.mappers.MuscleMapper;
import com.mini.workout_logger_backend.repositories.MuscleRepository;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

import java.util.List;
import java.util.Set;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class MuscleControllerTest extends AbstractCrudControllerTest<Muscle,
                                                              MuscleReadDTO,
                                                              MuscleWriteDTO,
                                                              MuscleMapper,
                                                              MuscleRepository> {

    @Override
    protected String getBaseUrl() {
        return "/muscles";
    }

    @Override
    protected List<MuscleWriteDTO> getWriteDtos() {
        return List.of(
                new MuscleWriteDTO("Biceps"),
                new MuscleWriteDTO("Triceps"),
                new MuscleWriteDTO("Deltoids")
        );
    }

    @Test
    void associations() throws Exception {
        MuscleWriteDTO muscleGroupWriteDTO = new MuscleWriteDTO("Arms");
        Muscle savedMuscleGroup = repository().save(mapper().toEntity(muscleGroupWriteDTO));
        MuscleWriteDTO muscleWriteDTO = new MuscleWriteDTO("Biceps", Set.of(savedMuscleGroup.getId()));
        Muscle savedMuscle = repository().save(mapper().toEntity(muscleWriteDTO));

        mockMvc.perform(get(getBaseUrl() + "/{id}", savedMuscle.getId())
                        .queryParam("lang", "pt_BR")
                        .accept(MediaType.ALL_VALUE))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].muscle_groups.length()")
                        .value(1))
                .andExpect(jsonPath("$.data[0].muscle_groups[0].id")
                        .value(savedMuscleGroup.getId()))
                .andExpect(jsonPath("$.data[0].muscle_groups[0].name")
                        .value(savedMuscleGroup.getName().getValue()));
    }

}
