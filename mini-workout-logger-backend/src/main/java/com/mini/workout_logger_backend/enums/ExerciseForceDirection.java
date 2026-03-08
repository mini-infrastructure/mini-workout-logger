package com.mini.workout_logger_backend.enums;

import com.mini.java_core.enums.TranslatableEnum;

/**
 * Source: @see <a href="https://exrx.net/Kinesiology/Glossary#Forces">ExRx.net - Forces</a>
 */
public enum ExerciseForceDirection implements TranslatableEnum<ExerciseForceDirection> {

    /**
     * Compression.
     */
    PUSH,

    /**
     * Tension.
     */
    PULL,

    /**
     * Shear.
     */
    SLIDE,

    /**
     * Torsion.
     */
    ROTATE_OR_TWIST,
    ;

}
