package com.mini.workout_logger_backend.controller;

import com.mini.java_core.AbstractCrudControllerTest;
import com.mini.workout_logger_backend.dto.*;
import com.mini.workout_logger_backend.entity.Exercise;
import com.mini.workout_logger_backend.entity.Muscle;
import com.mini.workout_logger_backend.entity.Workout;
import com.mini.workout_logger_backend.enums.*;
import com.mini.workout_logger_backend.mapper.ExerciseMapper;
import com.mini.workout_logger_backend.mapper.MuscleMapper;
import com.mini.workout_logger_backend.mapper.WorkoutMapper;
import com.mini.workout_logger_backend.repository.ExerciseRepository;
import com.mini.workout_logger_backend.repository.MuscleRepository;
import com.mini.workout_logger_backend.repository.WorkoutRepository;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Set;

public class WorkoutControllerTest extends AbstractCrudControllerTest<Workout,
                                                                      WorkoutReadDTO,
                                                                      WorkoutWriteDTO,
                                                                      WorkoutMapper,
                                                                      WorkoutRepository> {
    @Autowired
    private MuscleMapper muscleMapper;

    @Autowired
    private MuscleRepository muscleRepository;

    private List<Muscle> savedMuscles;

    @Autowired
    private ExerciseMapper exerciseMapper;

    @Autowired
    private ExerciseRepository exerciseRepository;

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
                )
        );
    }

}
