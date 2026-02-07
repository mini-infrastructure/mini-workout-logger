package com.mini.workout_logger_backend.validators;

import com.mini.workout_logger_backend.annotations.WorkoutExerciseExecutionValidated;
import com.mini.workout_logger_backend.dtos.WorkoutExerciseExecutionWriteDTO;
import com.mini.workout_logger_backend.entities.WorkoutExercise;
import com.mini.workout_logger_backend.repositories.WorkoutExerciseRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

public class WorkoutExerciseExecutionValidator implements ConstraintValidator<WorkoutExerciseExecutionValidated, WorkoutExerciseExecutionWriteDTO> {

    @Autowired
    WorkoutExerciseRepository workoutExerciseRepository;

    @Override
    public boolean isValid(WorkoutExerciseExecutionWriteDTO value,
                           ConstraintValidatorContext context) {

        if (value == null) {
            return true;
        }

        boolean hasError = false;
        context.disableDefaultConstraintViolation();

        // Find parent.
        WorkoutExercise workoutExercise = workoutExerciseRepository.safeFindById(value.getWorkoutExerciseId());

        // Loop through `setExecutions` and guarantees that each `setId` actually belongs to the `workoutExerciseId`.
        if (value.getSetExecutions() != null) {
            for (var setExecution : value.getSetExecutions()) {
                boolean belongsToWorkoutExercise = workoutExercise.getSets().stream()
                        .anyMatch(s -> s.getId().equals(setExecution.getSetId()));
                if (!belongsToWorkoutExercise) {
                    addViolation(context,
                            "setExecutions",
                            "Set ID " + setExecution.getSetId() +
                                    " does not belong to workout exercise ID " + value.getWorkoutExerciseId());
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
