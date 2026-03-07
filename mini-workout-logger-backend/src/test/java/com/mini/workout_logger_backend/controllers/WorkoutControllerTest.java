package com.mini.workout_logger_backend.controllers;

import com.jayway.jsonpath.JsonPath;
import com.mini.java_core.AbstractCrudControllerTest;
import com.mini.workout_logger_backend.dtos.*;
import com.mini.workout_logger_backend.entities.Exercise;
import com.mini.workout_logger_backend.entities.Muscle;
import com.mini.workout_logger_backend.entities.Workout;
import com.mini.workout_logger_backend.entities.WorkoutExercise;
import com.mini.workout_logger_backend.enums.*;
import com.mini.workout_logger_backend.mappers.*;
import com.mini.workout_logger_backend.repositories.*;
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
                                    30,
                                    WorkoutExerciseRole.BASIC
                                ),
                                new WorkoutExerciseWriteDTO(
                                    savedExercises.getLast().getId(),
                                    List.of(
                                            new SetWriteDTO(SetCategory.NORMAL, SetType.REPS_X_WEIGHT, 10, 50.0, null),
                                            new SetWriteDTO(SetCategory.NORMAL, SetType.REPS_X_WEIGHT, 10, 55.0, null),
                                            new SetWriteDTO(SetCategory.NORMAL, SetType.REPS_X_WEIGHT, 10, 60.0, null)
                                    ),
                                    ExerciseEquipment.BARBELL,
                                    45,
                                    WorkoutExerciseRole.AUXILIARY
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
                                        ExerciseEquipment.BARBELL,
                                        60,
                                        WorkoutExerciseRole.BASIC
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
                                        Set.of(
                                                new ExerciseMuscleWriteDTO(
                                                        savedMuscles.get(0).getId(),
                                                        ExerciseMuscleMovementClassification.TARGET
                                                ),
                                                new ExerciseMuscleWriteDTO(
                                                        savedMuscles.get(1).getId(),
                                                        ExerciseMuscleMovementClassification.TARGET
                                                )
                                        ),
                                        Set.of(ExerciseEquipment.BODYWEIGHT)
                                )
                        )
                ),
                exerciseRepository.save(
                        exerciseMapper.toEntity(
                                new ExerciseWriteDTO(
                                        "Squat",
                                        ExerciseCategory.STRENGTH,
                                        ExerciseDifficulty.BEGINNER,
                                        Set.of(
                                                new ExerciseMuscleWriteDTO(
                                                        savedMuscles.get(2).getId(),
                                                        ExerciseMuscleMovementClassification.STABILIZER
                                                )
                                        ),
                                        Set.of(ExerciseEquipment.BODYWEIGHT)
                                )
                        )
                ),
                exerciseRepository.save(
                        exerciseMapper.toEntity(
                                new ExerciseWriteDTO(
                                        "Deadlift",
                                        ExerciseCategory.STRENGTH,
                                        ExerciseDifficulty.INTERMEDIATE,
                                        Set.of(
                                                new ExerciseMuscleWriteDTO(
                                                        savedMuscles.get(1).getId(),
                                                        ExerciseMuscleMovementClassification.TARGET
                                                ),
                                                new ExerciseMuscleWriteDTO(
                                                        savedMuscles.get(2).getId(),
                                                        ExerciseMuscleMovementClassification.TARGET
                                                )
                                        ),
                                        Set.of(ExerciseEquipment.BARBELL)
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
            List<com.mini.workout_logger_backend.entities.Set> actualSets = setRepository.findAll()
                    .stream()
                    .filter(s -> s.getWorkoutExercise().getWorkout().getId().equals(dto.getId()))
                    .toList();
            Map<Long, List<com.mini.workout_logger_backend.entities.Set>> setsByWorkoutExerciseId =
                    actualSets.stream()
                            .collect(Collectors.groupingBy(
                                    s -> s.getWorkoutExercise().getId()
                            ));
            Map<String, WorkoutExercise> exercisesByName = actualWorkoutExercises.stream()
                    .collect(Collectors.toMap(
                            we -> we.getExercise().getName().getValue(),
                            we -> we
                    ));

            assertThat(exercisesByName).containsKeys("Push-Up", "Deadlift");
            assertThat(setsByWorkoutExerciseId.get(exercisesByName.get("Push-Up").getId())).hasSize(3);
            assertThat(setsByWorkoutExerciseId.get(exercisesByName.get("Deadlift").getId())).hasSize(3);

            WorkoutExercise we1 = actualWorkoutExercises.get(0);
            WorkoutExercise we2 = actualWorkoutExercises.get(1);

            assertThat(actualSets).hasSize(6);
            assertThat(setsByWorkoutExerciseId.get(we1.getId())).hasSize(3);
            assertThat(we1.getExercise().getName().getValue()).isEqualTo("Push-Up");
            assertThat(setsByWorkoutExerciseId.get(we2.getId())).hasSize(3);
            assertThat(we2.getExercise().getName().getValue()).isEqualTo("Deadlift");
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
                                Set.of(
                                        new ExerciseMuscleWriteDTO(
                                                savedMuscles.getFirst().getId(),
                                                ExerciseMuscleMovementClassification.TARGET
                                        )
                                ),
                                Set.of(ExerciseEquipment.BARBELL)
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
                60,
                WorkoutExerciseRole.AUXILIARY
        );

        mockMvc.perform(MockMvcRequestBuilders.put(getBaseUrl() + "/{id}/exercises", workout.getId())
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

    @Test
    void _reorderExercise() throws Exception {
        // Create workout.
        Workout workout = repository().save(mapper().toEntity(getWriteDtos().getFirst()));
        int oldExerciseCount = workout.getWorkoutExercises().size();

        // Get existing exercise IDs.
        Long firstExerciseId = workout.getWorkoutExercises().get(0).getId();
        Long secondExerciseId = workout.getWorkoutExercises().get(1).getId();

        // Perform.
        mockMvc.perform(
                MockMvcRequestBuilders.put(
                    getBaseUrl() + "/{id}/exercises/reorder/{exerciseId}",
                    workout.getId(),
                    secondExerciseId   )
                    .queryParam("newPosition", "0")
                    .queryParam("lang", "pt_BR")
                    .accept(MediaType.ALL_VALUE))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.length()").value(oldExerciseCount))
                .andExpect(jsonPath("$.data[0].id").value(secondExerciseId))
                .andExpect(jsonPath("$.data[1].id").value(firstExerciseId))
                .andReturn();

    }

    @Test
    void _removeExercise() throws Exception {
        // Create workout.
        Workout workout = repository().save(mapper().toEntity(getWriteDtos().getFirst()));
        int oldExerciseCount = workout.getWorkoutExercises().size();

        // Get an existing exercise ID.
        Long workoutExerciseIdToRemove = workout.getWorkoutExercises().getFirst().getId();

        // Perform.
        mockMvc.perform(
                MockMvcRequestBuilders.put(
                    getBaseUrl() + "/{id}/exercises/remove/{exerciseId}",
                    workout.getId(),
                    workoutExerciseIdToRemove   )
                    .queryParam("lang", "pt_BR")
                    .accept(MediaType.ALL_VALUE))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.length()").value(oldExerciseCount - 1))
                .andExpect(jsonPath("$.data[?(@.exercise.id == " + workoutExerciseIdToRemove     + ")]").doesNotExist())
                .andReturn();

    }

    @Test
    void _addSet() throws Exception {
        // Create workout.
        Workout workout = repository().save(mapper().toEntity(getWriteDtos().getFirst()));

        // Get existing workoutExercise ID.
        Long workoutExerciseId = workout.getWorkoutExercises().getFirst().getId();
        int oldSetCount = workout.getWorkoutExercises().getFirst().getSets().size();

        // Perform.
        SetWriteDTO newSet = new SetWriteDTO(SetCategory.NORMAL, SetType.REPS, 20, null, null);

        mockMvc.perform(
                MockMvcRequestBuilders.put(
                    getBaseUrl() + "/{id}/exercises/{exerciseId}/sets",
                    workout.getId(),
                    workoutExerciseId   )
                    .queryParam("lang", "pt_BR")
                    .contentType(MediaType.APPLICATION_JSON)
                    .accept(MediaType.ALL_VALUE)
                    .content(setMapper.toString(newSet)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.length()").value(oldSetCount + 1))
                .andReturn();
    }

    @Test
    void _reorderSet() throws Exception {
        // Create workout.
        Workout workout = repository().save(mapper().toEntity(getWriteDtos().getFirst()));

        // Get existing workoutExercise ID.
        Long workoutExerciseId = workout.getWorkoutExercises().getFirst().getId();

        // Get existing set IDs.
        List<com.mini.workout_logger_backend.entities.Set> sets = workout.getWorkoutExercises().getFirst().getSets();
        Long firstSetId = sets.get(0).getId();
        Long secondSetId = sets.get(1).getId();

        // Perform.
        mockMvc.perform(
                MockMvcRequestBuilders.put(
                    getBaseUrl() + "/{id}/exercises/{exerciseId}/sets/reorder/{setId}",
                    workout.getId(),
                    workoutExerciseId,
                    secondSetId   )
                    .queryParam("newPosition", "0")
                    .queryParam("lang", "pt_BR")
                    .accept(MediaType.ALL_VALUE))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.length()").value(sets.size()))
                .andExpect(jsonPath("$.data[0].id").value(secondSetId))
                .andExpect(jsonPath("$.data[1].id").value(firstSetId))
                .andReturn();
    }

    @Test
    void _removeSet() throws Exception {
        // Create workout.
        Workout workout = repository().save(mapper().toEntity(getWriteDtos().getFirst()));

        // Get existing workoutExercise ID.
        Long workoutExerciseId = workout.getWorkoutExercises().getFirst().getId();

        // Get existing set ID to remove.
        List<com.mini.workout_logger_backend.entities.Set> sets = workout.getWorkoutExercises().getFirst().getSets();
        Long setIdToRemove = sets.getFirst().getId();
        int oldSetCount = sets.size();

        // Perform.
        mockMvc.perform(
                MockMvcRequestBuilders.put(
                    getBaseUrl() + "/{id}/exercises/{exerciseId}/sets/remove/{setId}",
                    workout.getId(),
                    workoutExerciseId,
                    setIdToRemove   )
                    .queryParam("lang", "pt_BR")
                    .accept(MediaType.ALL_VALUE))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.length()").value(oldSetCount - 1))
                .andReturn();
    }

}
