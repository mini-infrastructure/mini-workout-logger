package com.mini.workout_logger_backend.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mini.java_core.dto.ReadDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.Instant;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class WorkoutExecutionLogReadDTO extends ReadDTO {

    @JsonProperty("workout_id")
    private Long workoutId;

    @JsonProperty("workout_name")
    private String workoutName;

    @JsonProperty("start_time")
    private Instant startTime;

    @JsonProperty("duration_seconds")
    private Long durationSeconds;

    private boolean completed;

}
