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
import com.mini.workout_logger_backend.utils.TestHelper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.List;
import java.util.Map;
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

    @Autowired
    private TestHelper testHelper;

    @Override
    protected String getBaseUrl() { return "/workouts"; }

    @Override
    protected List<WorkoutWriteDTO> getWriteDtos() {
        return testHelper.getWorkoutExercises(savedExercises);
    }

    /**
     * Muscles and exercises must exist before workouts are created.
     */
    @BeforeEach
    void setupMusclesAndExercises() {
        muscleRepository.deleteAll();
        exerciseRepository.deleteAll();
        savedMuscles = testHelper.getSavedMuscles();
        savedExercises = testHelper.getSavedExercises(savedMuscles);
    }

    /**
     * Assert that WorkoutExercises and Sets are correctly associated after creating a workout.
     * @param dto The created WorkoutReadDTO
     */
    @Override
    protected void afterCreate(WorkoutReadDTO dto) {
        WorkoutWriteDTO expectedWorkout =
                testHelper.getWorkoutDtoByName(dto.getName(), getWriteDtos());

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

        Map<Long, WorkoutExercise> workoutExerciseByExerciseId =
                actualWorkoutExercises.stream()
                        .collect(Collectors.toMap(
                                we -> we.getExercise().getId(),
                                we -> we
                        ));

        assertThat(actualWorkoutExercises)
                .hasSize(expectedWorkout.getWorkoutExercises().size());

        int expectedTotalSets = expectedWorkout.getWorkoutExercises()
                .stream()
                .mapToInt(e -> e.getSets().size())
                .sum();

        assertThat(actualSets).hasSize(expectedTotalSets);

        for (WorkoutExerciseWriteDTO expectedExercise : expectedWorkout.getWorkoutExercises()) {

            WorkoutExercise actualExercise =
                    workoutExerciseByExerciseId.get(expectedExercise.getExerciseId());

            assertThat(actualExercise).isNotNull();

            List<com.mini.workout_logger_backend.entities.Set> sets =
                    setsByWorkoutExerciseId.get(actualExercise.getId());

            assertThat(sets)
                    .hasSize(expectedExercise.getSets().size());
        }
    }

    @Test
    void _listExercisesAndSets() throws Exception {
        // Create workouts.
        List<Workout> workouts = testHelper.getSavedWorkouts(getWriteDtos());
        Workout workout = workouts.getFirst();
        List<WorkoutExercise> workoutExercises = workout.getWorkoutExercises();
        Exercise exercise = exerciseRepository.safeFindById(workoutExercises.getFirst().getExercise().getId());

        // List exercises.
        MvcResult exercisesResult = mockMvc.perform(
                        get(getBaseUrl() + "/{id}/exercises", workout.getId())
                                .queryParam("lang", "pt_BR")
                                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.length()").value(workoutExercises.size()))
                .andExpect(jsonPath("$.data[0].exercise.name").value(exercise.getName().getValue()))
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
                .andExpect(jsonPath("$.data.length()").value(workoutExercises.getFirst().getSets().size()));
    }

    @Test
    void _addExercise() throws Exception {
        // Create workout.
        Workout workout = repository().save(mapper().toEntity(getWriteDtos().getFirst()));
        int oldExerciseCount = workout.getWorkoutExercises().size();

        // Create new exercise.
        Exercise exercise = exerciseRepository.save(savedExercises.getFirst());

        // Perform.
        WorkoutExerciseWriteDTO we = new WorkoutExerciseWriteDTO(
                exercise.getId(),
                List.of(
                        new SetWriteDTO(SetCategory.NORMAL, SetType.REPS_X_WEIGHT, 8, 70.0, null),
                        new SetWriteDTO(SetCategory.NORMAL, SetType.REPS_X_WEIGHT, 8, 75.0, null)
                ),
                60
        );

        mockMvc.perform(MockMvcRequestBuilders.put(getBaseUrl() + "/{id}/exercises", workout.getId())
                        .queryParam("lang", "pt_BR")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.ALL_VALUE)
                        .content(workoutExerciseMapper.toString(we)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.length()").value(oldExerciseCount + 1))
                .andExpect(jsonPath("$.data[?(@.exercise.name == '" + exercise.getName().getValue() + "')]").exists())
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
