package com.mini.workout_logger_backend.validation;

import com.mini.workout_logger_backend.annotation.WorkoutExecutionValidated;
import com.mini.workout_logger_backend.dto.WorkoutExecutionWriteDTO;
import com.mini.workout_logger_backend.entity.Workout;
import com.mini.workout_logger_backend.repository.WorkoutRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

public class WorkoutExecutionValidator implements ConstraintValidator<WorkoutExecutionValidated, WorkoutExecutionWriteDTO> {

    @Autowired
    private WorkoutRepository workoutRepository;

    @Override
    public boolean isValid(WorkoutExecutionWriteDTO value,
                           ConstraintValidatorContext context) {

        if (value == null) {
            return true;
        }

        boolean hasError = false;
        context.disableDefaultConstraintViolation();

        // Find parent.
        Workout workout = workoutRepository.safeFindById(value.getWorkoutId());

        // Loop through `workoutExerciseExecutions` and guarantees that each `workoutExerciseId` actually belongs to the
        // `workoutId`.
        if (value.getWorkoutExerciseExecutions() != null) {
            for (var exerciseExecution : value.getWorkoutExerciseExecutions()) {
                boolean belongsToWorkout = workout.getWorkoutExercises().stream()
                        .anyMatch(we -> we.getId().equals(exerciseExecution.getWorkoutExerciseId()));
                if (!belongsToWorkout) {
                    addViolation(context,
                            "workoutExerciseExecutions",
                            "Workout exercise ID " + exerciseExecution.getWorkoutExerciseId() +
                                    " does not belong to workout ID " + value.getWorkoutId());
                    hasError = true;
                }
            }
        }

        return !hasError;
    }

    public void addViolation(ConstraintValidatorContext context,
                             String field,
                             String message) {
        context.buildConstraintViolationWithTemplate(message)
                .addPropertyNode(field)
                .addConstraintViolation();
    }

}