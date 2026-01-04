package com.mini.workout_logger_backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mini.java_core.dto.ReadDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class WorkoutReadDTO extends ReadDTO {

    private String name;

    @JsonProperty(value = "workout_exercises")
    private List<WorkoutExerciseReadDTO> workoutExercises;

    @JsonProperty(value = "workout_executions")
    private List<WorkoutExecutionReadDTO> workoutExecutions;

}
