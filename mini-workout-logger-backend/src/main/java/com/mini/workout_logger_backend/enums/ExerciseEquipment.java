package com.mini.workout_logger_backend.enums;

import com.mini.java_core.enums.TranslatableEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ExerciseEquipment implements TranslatableEnum<ExerciseEquipment> {

    BARBELL,
    DUMBBELL,
    BODYWEIGHT,
    BOSU_BALL,
    CABLE,
    EXERCISE_BALL,
    MACHINE,
    SMITH_MACHINE,
    MEDICINE_BALL,
    PLATE,
    RESISTANCE_BAND,
    TRX,
    KETTLEBELL
    ;

}
