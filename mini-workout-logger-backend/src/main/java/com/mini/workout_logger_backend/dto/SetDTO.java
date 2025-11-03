package com.mini.workout_logger_backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mini.java_core.dto.AbstractDTO;
import com.mini.workout_logger_backend.enums.SetCategory;
import com.mini.workout_logger_backend.enums.SetType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class SetDTO extends AbstractDTO {

    @Schema(accessMode = Schema.AccessMode.READ_ONLY)
    private Integer position;

    private SetCategory category;

    private SetType type;

    private Integer repetitions;

    private Double weight;

    private Integer durationSeconds;

    @Schema(accessMode = Schema.AccessMode.WRITE_ONLY)
    @JsonProperty(value = "exercise_execution_id", access = JsonProperty.Access.WRITE_ONLY)
    private Long exerciseExecutionId;

}
