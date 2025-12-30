package com.mini.workout_logger_backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.mini.java_core.dto.ReadDTO;
import com.mini.workout_logger_backend.enums.ExerciseEquipment;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExerciseExecutionReadDTO extends ReadDTO {

    private ExerciseReadDTO exercise;

    private ExerciseEquipment equipment;

    @JsonProperty(value = "rest_time_seconds")
    private Integer restTimeSeconds;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm:ss")
    @JsonProperty(value = "start_time")
    @Schema(example = "01/01/2026 12:00:00")
    private Date startTime;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm:ss")
    @JsonProperty(value = "end_time")
    @Schema(example = "01/01/2026 13:00:00")
    private Date endTime;

    private boolean completed;

    private List<SetReadDTO> sets = new ArrayList<>();

    public ExerciseExecutionReadDTO(ExerciseReadDTO exercise) {
        this.exercise = exercise;
    }

}
