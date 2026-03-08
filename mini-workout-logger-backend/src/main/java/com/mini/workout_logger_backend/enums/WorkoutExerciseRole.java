package com.mini.workout_logger_backend.enums;

import com.mini.java_core.enums.TranslatableEnum;

/**
 * Source: @see <a href="https://exrx.net/WeightTraining/Glossary#Basic">ExRx.net - Basic</a> and
 *         @see <a href="https://exrx.net/WeightTraining/Glossary#Auxiliary">ExRx.net - Auxiliary</a>
 */
public enum WorkoutExerciseRole implements TranslatableEnum<WorkoutExerciseRole> {

    /**
     * A principal exercise that involves more muscle mass and allows heavier loads, producing greater overall intensity.
     */
    BASIC,

    /**
     * A supplementary exercise that typically uses less load and muscle mass, focusing on specific muscles to support
     * the primary exercises.
     */
    AUXILIARY,
    ;

}
