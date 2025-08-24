package com.mini.workout_logger_backend.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import com.mini.java_core.service.MessageService;

@AllArgsConstructor
@Getter
public enum ExerciseCategory {

    ASSISTED_BODYWEIGHT,
    NUMBER_OF_REPS,
    DURATION,
    BARBELL,
    DUMBBELL,
    CABLE,
    MACHINE,
    RESISTANCE_BAND,
    KETTLEBELL
    ;

    public String getCode() {
        return MessageService.getCode(this);
    }

}
