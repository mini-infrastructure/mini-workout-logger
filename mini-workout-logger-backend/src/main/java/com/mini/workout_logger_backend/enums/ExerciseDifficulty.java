package com.mini.workout_logger_backend.enums;

import com.mini.java_core.enums.TranslatableEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ExerciseDifficulty implements TranslatableEnum<ExerciseDifficulty> {

    NOVICE,
    BEGINNER,
    INTERMEDIATE,
    ADVANCED
    ;

}
