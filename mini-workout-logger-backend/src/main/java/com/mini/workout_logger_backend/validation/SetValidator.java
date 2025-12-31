package com.mini.workout_logger_backend.validation;

import com.mini.workout_logger_backend.annotation.SetValidated;
import com.mini.workout_logger_backend.dto.SetWriteDTO;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class SetValidator implements ConstraintValidator<SetValidated, SetWriteDTO> {

    @Override
    public boolean isValid(SetWriteDTO value,
                           ConstraintValidatorContext context) {

        if (value == null) {
            return true;
        }

        boolean hasError = false;
        context.disableDefaultConstraintViolation();

        switch (value.getType()) {

            case REPS_X_WEIGHT -> {

                if (value.getRepetitions() == null) {
                    addViolation(context,
                            "repetitions",
                            "must be provided for REPS_X_WEIGHT sets.");
                    hasError = true;
                }

                if (value.getWeight() == null) {
                    addViolation(context,
                            "weight",
                            "must be provided for REPS_X_WEIGHT sets.");
                    hasError = true;
                }

                if (value.getDurationSeconds() != null) {
                    addViolation(context,
                            "durationSeconds",
                            "must be null for REPS_X_WEIGHT sets.");
                    hasError = true;
                }
            }

            case TIME_X_WEIGHT -> {

                if (value.getDurationSeconds() == null) {
                    addViolation(context,
                            "durationSeconds",
                            "must be provided for TIME_X_WEIGHT sets.");
                    hasError = true;
                }

                if (value.getWeight() == null) {
                    addViolation(context,
                            "weight",
                            "must be provided for TIME_X_WEIGHT sets.");
                    hasError = true;
                }

                if (value.getRepetitions() != null) {
                    addViolation(context,
                            "repetitions",
                            "must be null for TIME_X_WEIGHT sets.");
                    hasError = true;
                }
            }

            case TIME -> {

                if (value.getDurationSeconds() == null) {
                    addViolation(context,
                            "durationSeconds",
                            "must be provided for TIME sets.");
                    hasError = true;
                }

                if (value.getRepetitions() == null) {
                    addViolation(context,
                            "repetitions",
                            "must be provided for TIME sets.");
                    hasError = true;
                }

                if (value.getWeight() != null) {
                    addViolation(context,
                            "weight",
                            "must be null for TIME sets.");
                    hasError = true;
                }
            }
        }

        return !hasError;
    }

    private void addViolation(ConstraintValidatorContext context,
                              String field,
                              String message) {
        context.buildConstraintViolationWithTemplate(message)
                .addPropertyNode(field)
                .addConstraintViolation();
    }
}

