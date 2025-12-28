package com.mini.workout_logger_backend.controller;

import com.mini.java_core.AbstractCrudControllerTest;
import com.mini.workout_logger_backend.dto.ExerciseDTO;
import com.mini.workout_logger_backend.dto.MuscleDTO;
import com.mini.workout_logger_backend.entity.Exercise;
import com.mini.workout_logger_backend.entity.Muscle;
import com.mini.workout_logger_backend.enums.ExerciseCategory;
import com.mini.workout_logger_backend.enums.ExerciseDifficulty;
import com.mini.workout_logger_backend.mapper.ExerciseMapper;
import com.mini.workout_logger_backend.mapper.MuscleMapper;
import com.mini.workout_logger_backend.repository.ExerciseRepository;
import com.mini.workout_logger_backend.repository.MuscleRepository;
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
                                                                ExerciseDTO,
                                                                ExerciseMapper,
                                                                ExerciseRepository> {

    @Autowired
    private MuscleMapper muscleMapper;

    @Autowired
    private MuscleRepository muscleRepository;

    private List<Muscle> savedMuscles;

    @Override
    protected String getBaseUrl() {
        return "/exercises";
    }

    @Override
    protected List<ExerciseDTO> getTestDtos() {
        return List.of(
                new ExerciseDTO("Chest Fly",
                        ExerciseCategory.STRENGTH,
                        ExerciseDifficulty.BEGINNER,
                        savedMuscles.stream()
                                .map(muscle -> this.muscleMapper.toDTO(muscle))
                                .collect(Collectors.toSet())),
                new ExerciseDTO("Push-Up"),
                new ExerciseDTO("Squat")
        );
    }

    /**
     * {
     *   "name": "string",
     *   "category": "STRENGTH",
     *   "difficulty": "NOVICE",
     *   "muscle_ids": [
     *     0
     *   ]
     * }
     */
    @Override
    protected String createRequestBody(ExerciseDTO dto) {
        StringBuilder muscleIdsJsonArray = new StringBuilder("[");
        if (dto.getMuscles() != null) {
            String muscleIds = dto.getMuscles().stream()
                    .map(muscleDto -> muscleDto.getId().toString())
                    .collect(Collectors.joining(", "));
            muscleIdsJsonArray.append(muscleIds);
        }
        muscleIdsJsonArray.append("]");

        return """
        {
          "name": "%s",
          "category": "%s",
          "difficulty": "%s",
          "muscle_ids": %s
        }
        """.formatted(
                dto.getName(),
                dto.getCategory() != null ? dto.getCategory().name() : "",
                dto.getDifficulty() != null ? dto.getDifficulty().name() : "",
                muscleIdsJsonArray.toString()
        );
    }

    @Override
    protected void afterCreate(ExerciseDTO dto) {
        // Asserts that the association with Muscles is correctly established.
        if (dto.getName().equals("Chest Fly")) {
            List<String> muscleNames = dto.getMuscles().stream()
                    .map(MuscleDTO::getName)
                    .toList();
            List<String> expectedMuscleNames = savedMuscles.stream()
                    .map(muscle -> muscle.getName().getValue())
                    .toList();
            assertThat(muscleNames).containsExactlyInAnyOrderElementsOf(expectedMuscleNames);
        }
    }

    @BeforeEach
    void setupMuscles() {
        this.muscleRepository.deleteAll();

        this.savedMuscles = List.of(
                muscleRepository.save(muscleMapper.toEntity(new MuscleDTO("Chest"))),
                muscleRepository.save(muscleMapper.toEntity(new MuscleDTO("Back"))),
                muscleRepository.save(muscleMapper.toEntity(new MuscleDTO("Legs")))
        );
    }

    @Test
    void associations() throws Exception {
        // Exercise 1:n Muscle.
        ExerciseDTO exerciseDto = new ExerciseDTO("Chest Fly",
                ExerciseCategory.STRENGTH,
                ExerciseDifficulty.BEGINNER,
                savedMuscles.stream()
                        .map(muscle -> this.muscleMapper.toDTO(muscle))
                        .collect(Collectors.toSet()));
        Exercise savedExercise = this.repository().save(this.mapper().toEntity(exerciseDto));

        mockMvc.perform(get(getBaseUrl() + "/{id}", savedExercise.getId())
                        .queryParam("lang", "pt_BR")
                        .accept(MediaType.ALL_VALUE))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].muscles.length()").value(this.savedMuscles.size()))
                .andExpect(result -> {
                    List<Long> savedMuscleIds = savedMuscles.stream()
                            .map(Muscle::getId)
                            .toList();
                    List<String> savedMuscleNames = savedMuscles.stream()
                            .map(muscle -> muscle.getName().getValue())
                            .toList();

                    jsonPath("$.data[0].muscles[*].id").value(containsInAnyOrder(savedMuscleIds.toArray()));
                    jsonPath("$.data[0].muscles[*].name").value(containsInAnyOrder(savedMuscleNames.toArray()));
                });
    }

}
