package com.mini.workout_logger_backend.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mini.java_core.annotation.ExistsById;
import com.mini.java_core.dto.WriteDTO;
import com.mini.java_core.validation.group.RestMethod;
import com.mini.workout_logger_backend.repositories.SetRepository;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SetExecutionWriteDTO extends WriteDTO {

    @NotNull(groups = RestMethod.OnCreate.class)
    @ExistsById(repository = SetRepository.class)
    @JsonProperty("set_id")
    private Long setId;

    @JsonProperty("actual_repetitions")
    private Integer actualRepetitions;

    @JsonProperty("actual_weight")
    private Double actualWeight;

    @JsonProperty("actual_duration_seconds")
    private Integer actualDurationSeconds;

    @NotNull(groups = RestMethod.OnCreate.class)
    private boolean completed;

    private boolean skipped;

}
