package com.mini.workout_logger_backend.annotation;

import com.mini.workout_logger_backend.validation.WorkoutExerciseExecutionValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.TYPE;

@Target({ TYPE })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = WorkoutExerciseExecutionValidator.class)
@Documented
public @interface WorkoutExerciseExecutionValidated {

    String message() default "Invalid Workout Exercise Execution";

    Class<?>[] groups() default { };

    Class<? extends Payload>[] payload() default { };

}
