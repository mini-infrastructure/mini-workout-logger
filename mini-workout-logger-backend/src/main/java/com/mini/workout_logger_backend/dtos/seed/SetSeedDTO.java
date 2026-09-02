package com.mini.workout_logger_backend.dtos.seed;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for seeding sets from JSON.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SetSeedDTO {

    private String category;
    private String type;
    private Integer repetitions;
    private Double weight;
    private Integer durationSeconds;

}
