package com.mini.workout_logger_backend.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.mini.java_core.dto.ReadDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class WorkoutExecutionReadDTO extends ReadDTO {

//    private WorkoutReadDTO workout;

    @JsonProperty("workout_exercises_execution")
    private List<WorkoutExerciseExecutionReadDTO> workoutExerciseExecutions;

    private boolean completed;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm:ss")
    @JsonProperty("start_time")
    @Schema(example = "01/01/2026 12:00:00")
    private Date startTime;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm:ss")
    @JsonProperty("end_time")
    @Schema(example = "01/01/2026 13:00:00")
    private Date endTime;

}
