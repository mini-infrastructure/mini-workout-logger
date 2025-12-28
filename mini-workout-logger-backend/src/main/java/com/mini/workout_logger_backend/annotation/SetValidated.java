package com.mini.workout_logger_backend.annotation;

import com.mini.workout_logger_backend.validation.SetValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.TYPE;

@Target({ TYPE })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = SetValidator.class)
@Documented
public @interface SetValidated {

    String message() default "Invalid Set";

    Class<?>[] groups() default { };

    Class<? extends Payload>[] payload() default { };

}
