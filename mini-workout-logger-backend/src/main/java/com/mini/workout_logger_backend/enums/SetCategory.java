package com.mini.workout_logger_backend.enums;

import com.mini.java_core.enums.TranslatableEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Todo: Support for other set categories like drop sets, warm-ups, myo-reps, failure sets, etc.
 */
@AllArgsConstructor
@Getter
public enum SetCategory implements TranslatableEnum<SetCategory> {

    NORMAL,
    COMPOUND

}
