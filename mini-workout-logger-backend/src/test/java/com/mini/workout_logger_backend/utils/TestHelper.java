package com.mini.workout_logger_backend.utils;

import com.mini.workout_logger_backend.dtos.*;
import com.mini.workout_logger_backend.entities.Exercise;
import com.mini.workout_logger_backend.entities.Muscle;
import com.mini.workout_logger_backend.entities.Workout;
import com.mini.workout_logger_backend.enums.*;
import com.mini.workout_logger_backend.mappers.ExerciseMapper;
import com.mini.workout_logger_backend.mappers.MuscleMapper;
import com.mini.workout_logger_backend.mappers.WorkoutMapper;
import com.mini.workout_logger_backend.repositories.ExerciseRepository;
import com.mini.workout_logger_backend.repositories.MuscleRepository;
import com.mini.workout_logger_backend.repositories.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class TestHelper {

    @Autowired
    MuscleRepository muscleRepository;

    @Autowired
    MuscleMapper muscleMapper;

    @Autowired
    ExerciseRepository exerciseRepository;

    @Autowired
    ExerciseMapper exerciseMapper;

    @Autowired
    WorkoutRepository workoutRepository;

    @Autowired
    WorkoutMapper workoutMapper;

    public List<MuscleWriteDTO> getTestMuscles() {
        return List.of(
                new MuscleWriteDTO("Chest"),
                new MuscleWriteDTO("Back"),
                new MuscleWriteDTO("Legs"),
                new MuscleWriteDTO("Biceps"),
                new MuscleWriteDTO("Triceps"),
                new MuscleWriteDTO("Deltoids")
        );
    }

    public List<Muscle> getSavedMuscles(List<MuscleWriteDTO> muscleDTOs) {
        return muscleDTOs.stream()
                .map(dto -> muscleRepository.save(muscleMapper.toEntity(dto)))
                .collect(Collectors.toList());
    }

    public List<Muscle> getSavedMuscles() {
        return getSavedMuscles(getTestMuscles());
    }

    public MuscleWriteDTO getMuscleDtoByName(String name, List<MuscleWriteDTO> muscleDTOs) {
        return muscleDTOs.stream()
                .filter(dto -> dto.getName().equals(name))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Muscle DTO not found: " + name));
    }

    public MuscleWriteDTO getMuscleDtoByName(String name) {
        return getMuscleDtoByName(name, getTestMuscles());
    }

    public List<ExerciseWriteDTO> getTestExercises(List<Muscle> muscles) {
        return List.of(
                new ExerciseWriteDTO(
                        "Cable Isolateral Lying Fly",
                        ExerciseCategory.STRENGTH,
                        ExerciseDifficulty.BEGINNER,
                        ExerciseEquipment.CABLE,
                        ExerciseForceDirection.PUSH,
                        ExerciseMechanics.ISOLATED,
                        ExerciseRole.AUXILIARY,
                        ExerciseType.ISOLATERAL,
                        "Chest Fly",
                        muscles.stream()
                                .filter(m -> m.getName().getValue().equals("Chest"))
                                .map(muscle -> new ExerciseMuscleWriteDTO(
                                        muscle.getId(),
                                        ExerciseMuscleMovementClassification.TARGET
                                ))
                                .collect(Collectors.toSet())
                ),
                new ExerciseWriteDTO(
                        "Barbell Bent-over Row",
                        ExerciseCategory.STRENGTH,
                        ExerciseDifficulty.INTERMEDIATE,
                        ExerciseEquipment.BARBELL,
                        ExerciseForceDirection.PULL,
                        ExerciseMechanics.COMPOUND,
                        ExerciseRole.BASIC,
                        ExerciseType.BILATERAL,
                        "Row",
                        muscles.stream()
                                .filter(m -> m.getName().getValue().equals("Back"))
                                .map(muscle -> new ExerciseMuscleWriteDTO(
                                        muscle.getId(),
                                        ExerciseMuscleMovementClassification.TARGET
                                ))
                                .collect(Collectors.toSet())
                ),
                new ExerciseWriteDTO(
                        "Barbell Squat",
                        ExerciseCategory.STRENGTH,
                        ExerciseDifficulty.INTERMEDIATE,
                        ExerciseEquipment.BARBELL,
                        ExerciseForceDirection.PUSH,
                        ExerciseMechanics.COMPOUND,
                        ExerciseRole.BASIC,
                        ExerciseType.BILATERAL,
                        "Squat",
                        muscles.stream()
                                .filter(m -> m.getName().getValue().equals("Legs"))
                                .map(muscle -> new ExerciseMuscleWriteDTO(
                                        muscle.getId(),
                                        ExerciseMuscleMovementClassification.TARGET
                                ))
                                .collect(Collectors.toSet())
                )
        );
    }

    public List<Exercise> getSavedExercises(List<Muscle> muscles) {
        return getTestExercises(muscles).stream()
                .map(dto -> exerciseRepository.save(exerciseMapper.toEntity(dto)))
                .collect(Collectors.toList());
    }

    public ExerciseWriteDTO getExerciseDtoByName(String name, List<ExerciseWriteDTO> exerciseDTOs) {
        return exerciseDTOs.stream()
                .filter(dto -> dto.getName().equals(name))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Exercise DTO not found: " + name));
    }

    public List<WorkoutWriteDTO> getWorkoutExercises(List<Exercise> exercises) {
        return List.of(
                new WorkoutWriteDTO(
                        "Upper Body Workout",
                        List.of(
                                new WorkoutExerciseWriteDTO(
                                        exercises.getFirst().getId(),
                                        List.of(
                                                new SetWriteDTO(SetCategory.NORMAL, SetType.REPS, 12, null, null),
                                                new SetWriteDTO(SetCategory.NORMAL, SetType.REPS, 12, null, null),
                                                new SetWriteDTO(SetCategory.NORMAL, SetType.REPS, 12, null, null)
                                        ),
                                        30
                                ),
                                new WorkoutExerciseWriteDTO(
                                        exercises.getLast().getId(),
                                        List.of(
                                                new SetWriteDTO(SetCategory.NORMAL, SetType.REPS_X_WEIGHT, 10, 50.0, null),
                                                new SetWriteDTO(SetCategory.NORMAL, SetType.REPS_X_WEIGHT, 10, 55.0, null),
                                                new SetWriteDTO(SetCategory.NORMAL, SetType.REPS_X_WEIGHT, 10, 60.0, null)
                                        ),
                                        45
                                )
                        )
                ),
                new WorkoutWriteDTO(
                        "Leg Day",
                        List.of(
                                new WorkoutExerciseWriteDTO(
                                        exercises.getLast().getId(),
                                        List.of(
                                                new SetWriteDTO(SetCategory.NORMAL, SetType.REPS, 15, null, null),
                                                new SetWriteDTO(SetCategory.NORMAL, SetType.REPS, 15, null, null),
                                                new SetWriteDTO(SetCategory.NORMAL, SetType.REPS, 15, null, null)
                                        ),
                                        60
                                )
                        )
                )
        );
    }

    public List<Workout> getSavedWorkouts(List<WorkoutWriteDTO> workoutDTOs) {
        return workoutDTOs.stream()
                .map(dto -> workoutRepository.save(workoutMapper.toEntity(dto)))
                .collect(Collectors.toList());
    }

    public WorkoutWriteDTO getWorkoutDtoByName(String name, List<WorkoutWriteDTO> workoutDTOs) {
        return workoutDTOs.stream()
                .filter(dto -> dto.getName().equals(name))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Workout DTO not found: " + name));
    }

}
