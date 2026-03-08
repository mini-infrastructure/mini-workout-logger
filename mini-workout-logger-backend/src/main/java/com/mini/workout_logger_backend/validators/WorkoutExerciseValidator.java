package com.mini.workout_logger_backend.validators;

import com.mini.workout_logger_backend.annotations.WorkoutExerciseValidated;
import com.mini.workout_logger_backend.dtos.WorkoutExerciseWriteDTO;
import com.mini.workout_logger_backend.entities.Exercise;
import com.mini.workout_logger_backend.repositories.ExerciseRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

public class WorkoutExerciseValidator implements ConstraintValidator<WorkoutExerciseValidated, WorkoutExerciseWriteDTO> {

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Override
    public boolean isValid(WorkoutExerciseWriteDTO value, ConstraintValidatorContext context) {

        if (value == null) {
            return true;
        }

        boolean hasError = false;
        context.disableDefaultConstraintViolation();

        // Todo

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
