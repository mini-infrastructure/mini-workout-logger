package com.mini.workout_logger_backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mini.java_core.dto.ReadDTO;
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

    @JsonProperty("actual_repetitions")
    private Integer actualRepetitions;

    @JsonProperty("actual_weight")
    private Double actualWeight;

    @JsonProperty("actual_duration_seconds")
    private Integer actualDurationSeconds;

    private boolean completed;

}