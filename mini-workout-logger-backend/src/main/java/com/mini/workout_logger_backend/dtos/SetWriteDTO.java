package com.mini.workout_logger_backend.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mini.java_core.dto.WriteDTO;
import com.mini.workout_logger_backend.annotations.SetValidated;
import com.mini.workout_logger_backend.enums.SetCategory;
import com.mini.workout_logger_backend.enums.SetType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@SetValidated
public class SetWriteDTO extends WriteDTO {

    private SetCategory category;

    private SetType type;

    @JsonProperty("planned_repetitions")
    private Integer plannedRepetitions;

    @JsonProperty("planned_weight")
    private Double plannedWeight;

    @JsonProperty("planned_duration_seconds")
    private Integer plannedDurationSeconds;

}
