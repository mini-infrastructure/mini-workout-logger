package com.mini.workout_logger_backend.controller;

import com.jayway.jsonpath.JsonPath;
import com.mini.java_core.AbstractCrudControllerTest;
import com.mini.workout_logger_backend.dto.*;
import com.mini.workout_logger_backend.entity.Exercise;
import com.mini.workout_logger_backend.entity.Muscle;
import com.mini.workout_logger_backend.entity.Workout;
import com.mini.workout_logger_backend.entity.WorkoutExercise;
import com.mini.workout_logger_backend.enums.*;
import com.mini.workout_logger_backend.mapper.*;
import com.mini.workout_logger_backend.repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hibernate.validator.internal.util.Contracts.assertNotNull;
import static org.springframework.mock.http.server.reactive.MockServerHttpRequest.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class WorkoutControllerTest extends AbstractCrudControllerTest<Workout,
                                                                      WorkoutReadDTO,
                                                                      WorkoutWriteDTO,
                                                                      WorkoutMapper,
                                                                      WorkoutRepository> {
    @Autowired
    private MuscleMapper muscleMapper;

    @Autowired
    private MuscleRepository muscleRepository;

    @Autowired
    private ExerciseMapper exerciseMapper;

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Autowired
    private WorkoutExerciseRepository workoutExerciseRepository;

    @Autowired
    private WorkoutExerciseMapper workoutExerciseMapper;

    @Autowired
    private SetMapper setMapper;

    @Autowired
    private SetRepository setRepository;

    private List<Muscle> savedMuscles;

    private List<Exercise> savedExercises;

    @Override
    protected String getBaseUrl() { return "/workouts"; }

    @Override
    protected List<WorkoutWriteDTO> getWriteDtos() {
        return List.of(
                new WorkoutWriteDTO(
                        "Upper Body Workout",
                        List.of(
                                new WorkoutExerciseWriteDTO(
                                    savedExercises.getFirst().getId(),
                                    List.of(
                                            new SetWriteDTO(SetCategory.NORMAL, SetType.REPS, 12, null, null),
                                            new SetWriteDTO(SetCategory.NORMAL, SetType.REPS, 12, null, null),
                                            new SetWriteDTO(SetCategory.NORMAL, SetType.REPS, 12, null, null)
                                    ),
                                    ExerciseEquipment.BODYWEIGHT,
                                    30
                                ),
                                new WorkoutExerciseWriteDTO(
                                    savedExercises.getLast().getId(),
                                    List.of(
                                            new SetWriteDTO(SetCategory.NORMAL, SetType.REPS_X_WEIGHT, 10, 50.0, null),
                                            new SetWriteDTO(SetCategory.NORMAL, SetType.REPS_X_WEIGHT, 10, 55.0, null),
                                            new SetWriteDTO(SetCategory.NORMAL, SetType.REPS_X_WEIGHT, 10, 60.0, null)
                                    ),
                                    ExerciseEquipment.DUMBBELL,
                                    45
                                )
                        )
                ),
                new WorkoutWriteDTO(
                        "Leg Day",
                        List.of(
                                new WorkoutExerciseWriteDTO(
                                        savedExercises.getLast().getId(),
                                        List.of(
                                                new SetWriteDTO(SetCategory.NORMAL, SetType.REPS, 15, null, null),
                                                new SetWriteDTO(SetCategory.NORMAL, SetType.REPS, 15, null, null),
                                                new SetWriteDTO(SetCategory.NORMAL, SetType.REPS, 15, null, null)
                                        ),
                                        ExerciseEquipment.BODYWEIGHT,
                                        60
                                )
                        )
                )
        );
    }

    /**
     * Muscles and exercises must exist before workouts are created.
     */
    @BeforeEach
    void setupMusclesAndExercises() {
        muscleRepository.deleteAll();
        exerciseRepository.deleteAll();

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

        savedExercises = List.of(
                exerciseRepository.save(
                        exerciseMapper.toEntity(
                                new ExerciseWriteDTO(
                                        "Push-Up",
                                        ExerciseCategory.STRENGTH,
                                        ExerciseDifficulty.BEGINNER,
                                        Set.of(savedMuscles.get(0).getId(), savedMuscles.get(1).getId())
                                )
                        )
                ),
                exerciseRepository.save(
                        exerciseMapper.toEntity(
                                new ExerciseWriteDTO(
                                        "Squat",
                                        ExerciseCategory.STRENGTH,
                                        ExerciseDifficulty.BEGINNER,
                                        Set.of(savedMuscles.get(2).getId())
                                )
                        )
                ),
                exerciseRepository.save(
                        exerciseMapper.toEntity(
                                new ExerciseWriteDTO(
                                        "Deadlift",
                                        ExerciseCategory.STRENGTH,
                                        ExerciseDifficulty.INTERMEDIATE,
                                        Set.of(savedMuscles.get(1).getId(), savedMuscles.get(2).getId())
                                )
                        )
                )
        );
    }

    /**
     * Assert that WorkoutExercises and Sets are correctly associated after creating a workout.
     * @param dto The created WorkoutReadDTO
     */
    @Override
    protected void afterCreate(WorkoutReadDTO dto) {
        if (dto.getName().equals("Upper Body Workout")) {
            List<WorkoutExercise> actualWorkoutExercises = workoutExerciseRepository.findAll()
                    .stream()
                    .filter(we -> we.getWorkout().getId().equals(dto.getId()))
                    .toList();
            List<com.mini.workout_logger_backend.entity.Set> actualSets = setRepository.findAll()
                    .stream()
                    .filter(s -> s.getWorkoutExercise().getWorkout().getId().equals(dto.getId()))
                    .toList();
            Map<Long, List<com.mini.workout_logger_backend.entity.Set>> setsByWorkoutExerciseId =
                    actualSets.stream()
                            .collect(Collectors.groupingBy(
                                    s -> s.getWorkoutExercise().getId()
                            ));

            assertThat(actualWorkoutExercises).hasSize(2);
            assertThat(actualWorkoutExercises.get(0).getExercise().getName().getValue())
                    .isEqualTo("Push-Up");
            assertThat(actualWorkoutExercises.get(1).getExercise().getName().getValue())
                    .isEqualTo("Squat");

            WorkoutExercise we1 = actualWorkoutExercises.get(0);
            WorkoutExercise we2 = actualWorkoutExercises.get(1);

            assertThat(actualSets).hasSize(6);
            assertThat(setsByWorkoutExerciseId.get(we1.getId())).hasSize(3);
            assertThat(we1.getExercise().getName().getValue()).isEqualTo("Push-Up");
            assertThat(setsByWorkoutExerciseId.get(we2.getId())).hasSize(3);
            assertThat(we2.getExercise().getName().getValue()).isEqualTo("Squat");
        }
    }

    @Test
    void _listExercisesAndSets() throws Exception {
        // Create workout.
        Workout workout = repository().save(mapper().toEntity(getWriteDtos().getFirst()));

        // List exercises.
        MvcResult exercisesResult = mockMvc.perform(
                        get(getBaseUrl() + "/{id}/exercises", workout.getId())
                                .queryParam("lang", "pt_BR")
                                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.length()").value(2))
                .andExpect(jsonPath("$.data[0].exercise.name").value("Push-Up"))
                .andReturn();

        // Extract workoutExerciseId from response.
        String response = exercisesResult.getResponse().getContentAsString();
        Long workoutExerciseId = JsonPath
                .parse(response)
                .read("$.data[0].id", Long.class);

        // List sets.
        mockMvc.perform(get(getBaseUrl() + "/{id}/exercises/{exerciseId}/sets",
                                workout.getId(),
                                workoutExerciseId)
                                .queryParam("lang", "pt_BR")
                                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.data.length()").value(3));
    }

    @Test
    void _addExercise() throws Exception {
        // Create workout.
        Workout workout = repository().save(mapper().toEntity(getWriteDtos().getFirst()));
        int oldExerciseCount = workout.getWorkoutExercises().size();

        // Create new exercise.
        Exercise exercise = exerciseRepository.save(
                exerciseMapper.toEntity(
                        new ExerciseWriteDTO(
                                "Chest-Fly",
                                ExerciseCategory.STRENGTH,
                                ExerciseDifficulty.BEGINNER,
                                Set.of(savedMuscles.getFirst().getId())
                        )
                )
        );

        // Perform.
        WorkoutExerciseWriteDTO we = new WorkoutExerciseWriteDTO(
                exercise.getId(),
                List.of(
                        new SetWriteDTO(SetCategory.NORMAL, SetType.REPS_X_WEIGHT, 8, 70.0, null),
                        new SetWriteDTO(SetCategory.NORMAL, SetType.REPS_X_WEIGHT, 8, 75.0, null)
                ),
                ExerciseEquipment.BARBELL,
                60
        );

        MvcResult exercisesResult = mockMvc.perform(MockMvcRequestBuilders.put(getBaseUrl() + "/{id}/exercises", workout.getId())
                        .queryParam("lang", "pt_BR")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.ALL_VALUE)
                        .content(workoutExerciseMapper.toString(we)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.length()").value(oldExerciseCount + 1))
                .andExpect(jsonPath("$.data[?(@.exercise.name == 'Chest-Fly')]").exists())
                .andReturn();

    }

}
