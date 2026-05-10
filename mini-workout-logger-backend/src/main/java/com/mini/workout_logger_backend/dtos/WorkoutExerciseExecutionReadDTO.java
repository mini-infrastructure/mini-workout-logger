package com.mini.workout_logger_backend.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mini.java_core.dto.ReadDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class WorkoutExerciseExecutionReadDTO extends ReadDTO {

    @JsonProperty("workout_exercise_id")
    private Long workoutExerciseId;

    @JsonProperty("set_executions")
    private List<SetExecutionReadDTO> setExecutions;

    private boolean completed;

    private boolean skipped;

    @JsonProperty("start_time")
    @Schema(example = "2026-01-01T12:00:00Z")
    private Instant startTime;

    @JsonProperty("end_time")
    @Schema(example = "2026-01-01T13:00:00Z")
    private Instant endTime;

}
