package com.mini.workout_logger_backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.mini.java_core.dto.ReadDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
public class WorkoutExerciseExecutionReadDTO extends ReadDTO {

    private WorkoutExerciseReadDTO workoutExercise;

    private boolean completed;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm:ss")
    @JsonProperty(value = "start_time")
    @Schema(example = "01/01/2026 12:00:00")
    private Date startTime;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm:ss")
    @JsonProperty(value = "end_time")
    @Schema(example = "01/01/2026 13:00:00")
    private Date endTime;

}
