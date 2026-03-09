package com.mini.workout_logger_backend.enums;

import com.mini.java_core.enums.TranslatableEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ExerciseType implements TranslatableEnum<ExerciseType> {

    BILATERAL,
    ISOLATERAL,
    UNILATERAL
    ;

}
