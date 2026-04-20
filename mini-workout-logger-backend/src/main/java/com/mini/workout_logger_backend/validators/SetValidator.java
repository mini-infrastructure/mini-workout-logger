package com.mini.workout_logger_backend.validators;

import com.mini.java_core.service.MessageService;
import com.mini.workout_logger_backend.annotations.SetValidated;
import com.mini.workout_logger_backend.dtos.SetWriteDTO;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

public class SetValidator implements ConstraintValidator<SetValidated, SetWriteDTO> {

    @Autowired
    private MessageService messageService;

    @Override
    public boolean isValid(SetWriteDTO value,
                           ConstraintValidatorContext context) {

        if (value == null) {
            return true;
        }

        boolean hasError = false;
        context.disableDefaultConstraintViolation();

        if (value.getType() == null) {
            addViolation(context,
                    "type",
                    messageService.getLocalizedMessage("error.must_not_be_null"));
            return false;
        } else {
            switch (value.getType()) {

                case REPS -> {
                    if (value.getPlannedRepetitions() == null) {
                        addViolation(context,
                                "plannedRepetitions",
                                messageService.getLocalizedMessage("error.set.must_be_provided_for_reps"));
                        hasError = true;
                    } else if (value.getPlannedRepetitions() <= 0) {
                        addViolation(context,
                                "plannedRepetitions",
                                messageService.getLocalizedMessage("error.must_be_bigger_than", 0));
                        hasError = true;
                    }

                    if (value.getPlannedWeight() != null) {
                        addViolation(context,
                                "plannedWeight",
                                messageService.getLocalizedMessage("error.set.must_be_null_for_reps"));
                        hasError = true;
                    }

                    if (value.getPlannedDurationSeconds() != null) {
                        addViolation(context,
                                "plannedDurationSeconds",
                                messageService.getLocalizedMessage("error.set.must_be_null_for_reps"));
                        hasError = true;
                    }
                }

                case REPS_X_WEIGHT -> {

                    if (value.getPlannedRepetitions() == null) {
                        addViolation(context,
                                "plannedRepetitions",
                                messageService.getLocalizedMessage("error.set.must_be_provided_for_reps_x_weight"));
                        hasError = true;
                    } else if (value.getPlannedRepetitions() <= 0) {
                        addViolation(context,
                                "plannedRepetitions",
                                messageService.getLocalizedMessage("error.must_be_bigger_than", 0));
                        hasError = true;
                    }

                    if (value.getPlannedWeight() == null) {
                        addViolation(context,
                                "plannedWeight",
                                messageService.getLocalizedMessage("error.set.must_be_provided_for_reps_x_weight"));
                        hasError = true;
                    } else if (value.getPlannedWeight() <= 0) {
                        addViolation(context,
                                "plannedWeight",
                                messageService.getLocalizedMessage("error.must_be_bigger_than", 0));
                        hasError = true;
                    }

                    if (value.getPlannedDurationSeconds() != null) {
                        addViolation(context,
                                "plannedDurationSeconds",
                                messageService.getLocalizedMessage("error.set.must_be_null_for_reps_x_weight"));
                        hasError = true;
                    }
                }

                case TIME_X_WEIGHT -> {

                    if (value.getPlannedDurationSeconds() == null) {
                        addViolation(context,
                                "plannedDurationSeconds",
                                messageService.getLocalizedMessage("error.set.must_be_provided_for_time_x_weight"));
                        hasError = true;
                    } else if (value.getPlannedDurationSeconds() <= 0) {
                        addViolation(context,
                                "plannedDurationSeconds",
                                messageService.getLocalizedMessage("error.must_be_bigger_than", 0));
                        hasError = true;
                    }

                    if (value.getPlannedWeight() == null) {
                        addViolation(context,
                                "plannedWeight",
                                messageService.getLocalizedMessage("error.set.must_be_provided_for_time_x_weight"));
                        hasError = true;
                    } else if (value.getPlannedWeight() <= 0) {
                        addViolation(context,
                                "plannedWeight",
                                messageService.getLocalizedMessage("error.must_be_bigger_than", 0));
                        hasError = true;
                    }

                    if (value.getPlannedRepetitions() != null) {
                        addViolation(context,
                                "plannedRepetitions",
                                messageService.getLocalizedMessage("error.set.must_be_null_for_time_x_weight"));
                        hasError = true;
                    }
                }

                case TIME -> {

                    if (value.getPlannedDurationSeconds() == null) {
                        addViolation(context,
                                "plannedDurationSeconds",
                                messageService.getLocalizedMessage("error.set.must_be_provided_for_time"));
                        hasError = true;
                    } else if (value.getPlannedDurationSeconds() <= 0) {
                        addViolation(context,
                                "plannedDurationSeconds",
                                messageService.getLocalizedMessage("error.must_be_bigger_than", 0));
                        hasError = true;
                    }

                    if (value.getPlannedRepetitions() == null) {
                        addViolation(context,
                                "plannedRepetitions",
                                messageService.getLocalizedMessage("error.set.must_be_provided_for_time"));
                        hasError = true;
                    } else if (value.getPlannedRepetitions() <= 0) {
                        addViolation(context,
                                "plannedRepetitions",
                                messageService.getLocalizedMessage("error.must_be_bigger_than", 0));
                        hasError = true;
                    }

                    if (value.getPlannedWeight() != null) {
                        addViolation(context,
                                "plannedWeight",
                                messageService.getLocalizedMessage("error.set.must_be_null_for_time"));
                        hasError = true;
                    }
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