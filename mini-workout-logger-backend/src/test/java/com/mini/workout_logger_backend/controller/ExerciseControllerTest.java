package com.mini.workout_logger_backend.controller;

import com.mini.java_core.AbstractCrudControllerTest;
import com.mini.workout_logger_backend.dto.ExerciseReadDTO;
import com.mini.workout_logger_backend.dto.ExerciseWriteDTO;
import com.mini.workout_logger_backend.dto.MuscleReadDTO;
import com.mini.workout_logger_backend.dto.MuscleWriteDTO;
import com.mini.workout_logger_backend.entity.Exercise;
import com.mini.workout_logger_backend.entity.Muscle;
import com.mini.workout_logger_backend.enums.ExerciseCategory;
import com.mini.workout_logger_backend.enums.ExerciseDifficulty;
import com.mini.workout_logger_backend.mapper.ExerciseMapper;
import com.mini.workout_logger_backend.mapper.MuscleMapper;
import com.mini.workout_logger_backend.repository.ExerciseRepository;
import com.mini.workout_logger_backend.repository.MuscleRepository;
import com.mini.workout_logger_backend.repository.WorkoutExerciseRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

import java.util.List;
import java.util.stream.Collectors;

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

    @Override
    protected String getBaseUrl() {
        return "/exercises";
    }

    @Override
    protected List<ExerciseWriteDTO> getWriteDtos() {
        return List.of(
                new ExerciseWriteDTO(
                        "Chest Fly",
                        ExerciseCategory.STRENGTH,
                        ExerciseDifficulty.BEGINNER,
                        savedMuscles.stream()
                                .map(Muscle::getId)
                                .collect(Collectors.toSet())
                ),
                new ExerciseWriteDTO("Push-Up"),
                new ExerciseWriteDTO("Squat")
        );
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
        if (dto.getName().equals("Chest Fly")) {
            List<String> muscleNames = dto.getMuscles().stream()
                    .map(MuscleReadDTO::getName)
                    .toList();

            List<String> expectedMuscleNames = savedMuscles.stream()
                    .map(muscle -> muscle.getName().getValue())
                    .toList();

            assertThat(muscleNames)
                    .containsExactlyInAnyOrderElementsOf(expectedMuscleNames);
        }
    }

    /**
     * Muscles must exist before exercises are created.
     */
    @BeforeEach
    void setupMuscles() {
        muscleRepository.deleteAll();

        savedMuscles = List.of(
                muscleRepository.save(
                        muscleMapper.toEntity(new MuscleWriteDTO("Chest"))
                ),
                muscleRepository.save(
                        muscleMapper.toEntity(new MuscleWriteDTO("Back"))
                ),
                muscleRepository.save(
                        muscleMapper.toEntity(new MuscleWriteDTO("Legs"))
                )
        );
    }

    @Test
    void associations() throws Exception {

        ExerciseWriteDTO exerciseWriteDTO = new ExerciseWriteDTO(
                "Chest Fly",
                ExerciseCategory.STRENGTH,
                ExerciseDifficulty.BEGINNER,
                savedMuscles.stream()
                        .map(Muscle::getId)
                        .collect(Collectors.toSet())
        );

        Exercise savedExercise =
                repository().save(mapper().toEntity(exerciseWriteDTO));

        mockMvc.perform(get(getBaseUrl() + "/{id}", savedExercise.getId())
                        .queryParam("lang", "pt_BR")
                        .accept(MediaType.ALL_VALUE))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].muscles.length()")
                        .value(savedMuscles.size()))
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
