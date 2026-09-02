package com.mini.workout_logger_backend.dtos.seed;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

/**
 * DTO for seeding workouts from JSON.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutSeedDTO {

    private String name;
    private List<WorkoutExerciseSeedDTO> exercises = new ArrayList<>();

}
