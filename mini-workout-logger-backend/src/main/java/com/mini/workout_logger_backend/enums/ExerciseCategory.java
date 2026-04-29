package com.mini.workout_logger_backend.enums;

import com.mini.java_core.enums.TranslatableEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ExerciseCategory implements TranslatableEnum<ExerciseCategory> {

    STRENGTH,
    CARDIO,
    STRETCHING,
    POWERLIFTING,
    OLYMPIC_WEIGHTLIFTING,
    STRONGMAN,
    CALISTHENICS,
    PLYOMETRICS,
    RECOVERY,
    HIT,
    MOBILITY,
    WARM_UP
    ;

}
