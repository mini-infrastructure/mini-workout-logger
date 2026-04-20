package com.mini.workout_logger_backend.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mini.java_core.dto.ReadDTO;
import com.mini.workout_logger_backend.enums.SetCategory;
import com.mini.workout_logger_backend.enums.SetType;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.Instant;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SetExecutionReadDTO extends ReadDTO {

    private SetReadDTO set;

    @JsonProperty("planned_repetitions")
    private Integer plannedRepetitions;

    @JsonProperty("planned_weight")
    private Double plannedWeight;

    @JsonProperty("planned_duration_seconds")
    private Integer plannedDurationSeconds;

    @JsonProperty("planned_category")
    private SetCategory plannedCategory;

    @JsonProperty("planned_type")
    private SetType plannedType;

    @JsonProperty("actual_repetitions")
    private Integer actualRepetitions;

    @JsonProperty("actual_weight")
    private Double actualWeight;

    @JsonProperty("actual_duration_seconds")
    private Integer actualDurationSeconds;

    private boolean completed;

    private boolean skipped;

    @JsonProperty("start_time")
    @Schema(example = "2026-01-01T12:00:00Z")
    private Instant startTime;

    @JsonProperty("end_time")
    @Schema(example = "2026-01-01T12:01:00Z")
    private Instant endTime;

}