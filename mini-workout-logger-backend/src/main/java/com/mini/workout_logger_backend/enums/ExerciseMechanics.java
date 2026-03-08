package com.mini.workout_logger_backend.enums;

import com.mini.java_core.enums.TranslatableEnum;

/**
 * Source: @see <a href="https://exrx.net/WeightTraining/Glossary#Compound">ExRx.net - Compound</a> and
 *         @see <a href="https://exrx.net/WeightTraining/Glossary#Isolated">ExRx.net - Isolated</a>
 */
public enum ExerciseMechanics implements TranslatableEnum<ExerciseMechanics> {

    /**
     * An exercise that involves two or more simultaneously joint movements.
     */
    ISOLATED,

    /**
     * An exercise that involves just one discernible joint movement.
     */
    COMPOUND,
    ;

}
