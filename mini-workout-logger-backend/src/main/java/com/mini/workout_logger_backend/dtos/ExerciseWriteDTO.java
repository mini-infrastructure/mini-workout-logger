package com.mini.workout_logger_backend.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mini.java_core.dto.WriteDTO;
import com.mini.java_core.validation.group.RestMethod;
import com.mini.workout_logger_backend.enums.ExerciseCategory;
import com.mini.workout_logger_backend.enums.ExerciseDifficulty;
import com.mini.workout_logger_backend.enums.ExerciseEquipment;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
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

    @NotNull(groups = RestMethod.OnCreate.class)
    private String name;

    private ExerciseCategory category;

    private ExerciseDifficulty difficulty;

    @Valid
    @JsonProperty("exercise_muscles")
    private Set<ExerciseMuscleWriteDTO> exerciseMuscles = new HashSet<>();

    private Set<ExerciseEquipment> equipments = new HashSet<>();

    public ExerciseWriteDTO(String name) {
        this.name = name;
    }

}
