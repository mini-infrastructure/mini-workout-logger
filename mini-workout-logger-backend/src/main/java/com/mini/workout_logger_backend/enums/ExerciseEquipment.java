package com.mini.workout_logger_backend.enums;

import com.mini.java_core.enums.TranslatableEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ExerciseEquipment implements TranslatableEnum<ExerciseEquipment> {

    ASSISTED_BODYWEIGHT,
    BARBELL,
    DUMBBELL,
    CABLE,
    RESISTANCE_BAND,
    KETTLEBELL,
    MACHINE,
    MEDICINE_BALL,
    EXERCISE_BALL
    ;

}
