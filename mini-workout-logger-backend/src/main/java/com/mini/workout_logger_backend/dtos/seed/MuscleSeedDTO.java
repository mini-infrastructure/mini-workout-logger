package com.mini.workout_logger_backend.dtos.seed;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for seeding muscles from JSON.
 * The parent field references the muscle group this muscle belongs to.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MuscleSeedDTO {

    private String name;
    private String parent;

}
