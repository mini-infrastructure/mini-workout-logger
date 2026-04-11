package com.mini.workout_logger_backend.annotations;

import com.mini.workout_logger_backend.validators.WorkoutExerciseValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.TYPE;

@Target({ TYPE })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = WorkoutExerciseValidator.class)
@Documented
public @interface WorkoutExerciseValidated {

    String message() default "Invalid Workout Exercise";

    Class<?>[] groups() default { };

    Class<? extends Payload>[] payload() default { };

}
