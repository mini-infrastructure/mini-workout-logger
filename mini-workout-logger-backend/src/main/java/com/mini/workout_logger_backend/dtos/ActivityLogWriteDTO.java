package com.mini.workout_logger_backend.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mini.java_core.dto.WriteDTO;
import com.mini.java_core.validation.group.RestMethod;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.Instant;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ActivityLogWriteDTO extends WriteDTO {

    @NotNull(groups = RestMethod.OnCreate.class)
    @JsonProperty("exercise_id")
    private Long exerciseId;

    @JsonProperty("start_time")
    private Instant startTime;

    @JsonProperty("duration_seconds")
    private Long durationSeconds;

    @JsonProperty("completed")
    private Boolean completed;

}
