package com.mini.workout_logger_backend.enums;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum ExerciseType {

    ASSISTED_BODYWEIGHT("Assisted Bodyweight"),
    NUMBER_OF_REPS("Number of Reps"),
    DURATION("Duration"),
    BARBELL("Barbell"),
    DUMBBELL("Dumbbell"),
    CABLE("Cable"),
    MACHINE("Machine"),
    RESISTANCE_BAND("Resistance Band"),
    KETTLEBELL("Kettlebell"),
    WEIGHTED_BODYWEIGHT("Weighted Bodyweight"),
    WEIGHTED_DURATION("Weighted Duration");

    private final String type;

}
