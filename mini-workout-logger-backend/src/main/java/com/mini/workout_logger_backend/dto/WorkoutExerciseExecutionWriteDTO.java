package com.mini.workout_logger_backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mini.java_core.dto.WriteDTO;
import com.mini.workout_logger_backend.annotation.WorkoutExerciseExecutionValidated;
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
@WorkoutExerciseExecutionValidated
public class WorkoutExerciseExecutionWriteDTO extends WriteDTO {

    @NotNull
    @JsonProperty("workout_exercise_id")
    private Long workoutExerciseId;

    @Valid
    @JsonProperty("set_executions")
    private List<SetExecutionWriteDTO> setExecutions;

}
