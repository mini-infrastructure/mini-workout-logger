package com.mini.workout_logger_backend.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mini.java_core.dto.ReadDTO;
import com.mini.workout_logger_backend.enums.ExerciseRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class WorkoutExerciseReadDTO extends ReadDTO {

    private Integer position;

    private ExerciseReadDTO exercise;

    private List<SetReadDTO> sets;

    @JsonProperty("rest_time_seconds")
    private Integer restTimeSeconds;

    private String notes;

}
