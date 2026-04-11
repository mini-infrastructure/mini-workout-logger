package com.mini.workout_logger_backend.controllers;

import com.mini.java_core.AbstractCrudControllerTest;
import com.mini.workout_logger_backend.dtos.*;
import com.mini.workout_logger_backend.entities.Exercise;
import com.mini.workout_logger_backend.entities.Muscle;
import com.mini.workout_logger_backend.mappers.ExerciseMapper;
import com.mini.workout_logger_backend.mappers.MuscleMapper;
import com.mini.workout_logger_backend.repositories.ExerciseRepository;
import com.mini.workout_logger_backend.repositories.MuscleRepository;
import com.mini.workout_logger_backend.repositories.WorkoutExerciseRepository;
import com.mini.workout_logger_backend.utils.TestHelper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.containsInAnyOrder;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class ExerciseControllerTest extends AbstractCrudControllerTest<Exercise,
                                                                ExerciseReadDTO,
                                                                ExerciseWriteDTO,
                                                                ExerciseMapper,
                                                                ExerciseRepository> {

    @Autowired
    private MuscleMapper muscleMapper;

    @Autowired
    private MuscleRepository muscleRepository;

    @Autowired
    private WorkoutExerciseRepository workoutExerciseRepository;

    private List<Muscle> savedMuscles;

    @Autowired
    private TestHelper testHelper;

    @Override
    protected String getBaseUrl() {
        return "/exercises";
    }

    @Override
    protected List<ExerciseWriteDTO> getWriteDtos() {
        return testHelper.getTestExercises(savedMuscles);
    }

    @Override
    @BeforeEach
    public void clean() {
        workoutExerciseRepository.deleteAll();
        super.clean();
    }

    /**
     * Assert that muscles are correctly associated after creating an exercise.
     * @param dto The created ExerciseReadDTO
     */
    @Override
    protected void afterCreate(ExerciseReadDTO dto) {
        if (testHelper.getExerciseDtoByName("Cable Isolateral Lying Fly", getWriteDtos()).getName().equals(dto.getName())) {
            List<String> muscleNames = dto.getMuscles().stream()
                    .map(MuscleReadDTO::getName)
                    .toList();

            List<String> expectedMuscleNames = savedMuscles.stream()
                    .map(muscle -> muscle.getName().getValue())
                    .toList();

            assertThat(expectedMuscleNames).containsAll(muscleNames);
        }
    }

    /**
     * Muscles must exist before exercises are created.
     */
    @BeforeEach
    void setupMuscles() {
        muscleRepository.deleteAll();
        savedMuscles = testHelper.getSavedMuscles();
    }

    @Test
    void associations() throws Exception {

        ExerciseWriteDTO exerciseWriteDTO = getWriteDtos().getFirst();
        Exercise savedExercise =
                repository().save(mapper().toEntity(exerciseWriteDTO));

        mockMvc.perform(get(getBaseUrl() + "/{id}", savedExercise.getId())
                        .queryParam("lang", "pt_BR")
                        .accept(MediaType.ALL_VALUE))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].muscles.length()")
                        .value(1))
                .andExpect(result -> {
                    List<Long> savedMuscleIds = savedMuscles.stream()
                            .map(Muscle::getId)
                            .toList();

                    List<String> savedMuscleNames = savedMuscles.stream()
                            .map(m -> m.getName().getValue())
                            .toList();

                    jsonPath("$.data[0].muscles[*].id")
                            .value(containsInAnyOrder(savedMuscleIds.toArray()));

                    jsonPath("$.data[0].muscles[*].name")
                            .value(containsInAnyOrder(savedMuscleNames.toArray()));
                });
    }

}
