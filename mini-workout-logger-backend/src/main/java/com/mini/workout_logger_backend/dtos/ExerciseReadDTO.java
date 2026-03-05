package com.mini.workout_logger_backend.dtos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mini.java_core.dto.ReadDTO;
import com.mini.workout_logger_backend.enums.ExerciseCategory;
import com.mini.workout_logger_backend.enums.ExerciseDifficulty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExerciseReadDTO extends ReadDTO {

    private String name;

    private ExerciseCategory category;

    private ExerciseDifficulty difficulty;

    private Set<MuscleReadDTO> muscles = new HashSet<>();

    private Set<String> rootMuscles = new HashSet<>();

    public ExerciseReadDTO(String name) {
        this.name = name;
    }

}
