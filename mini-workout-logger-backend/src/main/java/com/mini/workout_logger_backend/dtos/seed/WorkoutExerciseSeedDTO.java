package com.mini.workout_logger_backend.dtos.seed;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

/**
 * DTO for seeding workout exercises from JSON.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutExerciseSeedDTO {

    private String exercise;
    private Integer restTimeSeconds;
    private List<SetSeedDTO> sets = new ArrayList<>();

}
