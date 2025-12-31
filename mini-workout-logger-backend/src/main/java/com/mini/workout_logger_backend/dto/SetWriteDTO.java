package com.mini.workout_logger_backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mini.java_core.dto.WriteDTO;
import com.mini.workout_logger_backend.annotation.SetValidated;
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

    private Integer repetitions;

    private Double weight;

    @JsonProperty(value = "duration_seconds")
    private Integer durationSeconds;

}
