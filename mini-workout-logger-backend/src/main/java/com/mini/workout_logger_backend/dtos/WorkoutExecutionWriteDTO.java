package com.mini.workout_logger_backend.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mini.java_core.dto.WriteDTO;
import com.mini.workout_logger_backend.annotations.WorkoutExecutionValidated;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@WorkoutExecutionValidated
public class WorkoutExecutionWriteDTO extends WriteDTO {

    @NotNull
    @JsonProperty("workout_id")
    @Schema(hidden = true)
    private Long workoutId;

    @Valid
    @JsonProperty("executions")
    private List<WorkoutExerciseExecutionWriteDTO> workoutExerciseExecutions;

}
