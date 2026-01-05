package com.mini.workout_logger_backend.dto;

import com.mini.java_core.dto.WriteDTO;
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
public class WorkoutExecutionWriteDTO extends WriteDTO {

    @NotNull
    private Long workoutId;

}
