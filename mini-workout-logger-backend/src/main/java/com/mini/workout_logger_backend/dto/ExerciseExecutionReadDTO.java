package com.mini.workout_logger_backend.dto;

import com.mini.java_core.dto.ReadDTO;
import com.mini.workout_logger_backend.enums.ExerciseEquipment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExerciseExecutionReadDTO extends ReadDTO {

    private ExerciseReadDTO exercise;

    private List<SetReadDTO> sets = new ArrayList<>();

    private ExerciseEquipment equipment;

    private Integer restTimeSeconds;

    public ExerciseExecutionReadDTO(ExerciseReadDTO exercise) {
        this.exercise = exercise;
    }

}
