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
public class ExerciseExecutionHistoryReadDTO extends ReadDTO {

    @JsonProperty("workout_execution_id")
    private Long workoutExecutionId;

    @JsonProperty("workout_name")
    private String workoutName;

    @JsonProperty("execution_date")
    @Schema(example = "2026-01-01T12:00:00Z")
    private Instant executionDate;

    private boolean completed;

    @JsonProperty("set_executions")
    private List<SetExecutionReadDTO> setExecutions;

}
