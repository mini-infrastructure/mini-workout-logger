package com.mini.workout_logger_backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mini.java_core.annotation.ExistsById;
import com.mini.java_core.dto.WriteDTO;
import com.mini.workout_logger_backend.repository.SetRepository;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SetExecutionWriteDTO extends WriteDTO {

    @NotNull
    @ExistsById(repository = SetRepository.class)
    @JsonProperty("set_id")
    private Long setId;

    @JsonProperty("actual_repetitions")
    private Integer actualRepetitions;

    @JsonProperty("actual_weight")
    private Double actualWeight;

    @JsonProperty("actual_duration_seconds")
    private Integer actualDurationSeconds;

    @NotNull
    private boolean completed;

}
