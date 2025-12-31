package com.mini.workout_logger_backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mini.java_core.dto.WriteDTO;
import com.mini.workout_logger_backend.enums.ExerciseCategory;
import com.mini.workout_logger_backend.enums.ExerciseDifficulty;
import jakarta.validation.constraints.NotNull;
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
public class ExerciseWriteDTO extends WriteDTO {

    @NotNull
    private String name;

    private ExerciseCategory category;

    private ExerciseDifficulty difficulty;

    @JsonProperty(value = "muscle_ids")
    private Set<Long> muscleIds = new HashSet<>();

    public ExerciseWriteDTO(String name) {
        this.name = name;
    }

}
