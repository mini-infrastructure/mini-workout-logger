package com.mini.workout_logger_backend.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Units {

    NONE("none"),

    /**
     * Mass.
     */
    KILOGRAM("kg"),

    /**
     * Time.
     */
    SECOND("s"),
    MINUTE("min"),
    HOUR("h")
    ;

    /**
     * Symbol of the unit, e.g., "kg" for kilograms.
     */
    private final String symbol;

}
