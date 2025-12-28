package com.mini.workout_logger_backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mini.java_core.dto.AbstractDTO;
import com.mini.java_core.validation.group.RestMethod;
import com.mini.workout_logger_backend.enums.ExerciseCategory;
import com.mini.workout_logger_backend.enums.ExerciseDifficulty;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class ExerciseDTO extends AbstractDTO {

    @NotNull(groups = RestMethod.OnCreate.class)
    private String name;

    private ExerciseCategory category;

    private ExerciseDifficulty difficulty;

    @Schema(accessMode = Schema.AccessMode.WRITE_ONLY)
    @JsonProperty(value = "muscle_ids", access = JsonProperty.Access.WRITE_ONLY)
    private Set<Long> muscleIds = new HashSet<>();

    @Schema(accessMode = Schema.AccessMode.READ_ONLY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Set<MuscleDTO> muscles = new HashSet<>();

    public ExerciseDTO(String name) {
        this.name = name;
        this.category = null;
        this.difficulty = null;
        this.muscleIds = new HashSet<>();
        this.muscles = new HashSet<>();
    }

    public ExerciseDTO(String name,
                       ExerciseCategory category,
                       ExerciseDifficulty difficulty,
                       Set<MuscleDTO> muscles) {
        this.name = name;
        this.category = category;
        this.difficulty = difficulty;
        this.muscles = muscles;
        this.muscleIds = null;
    }

    public void addMuscleId(Long muscleId) {
        this.muscleIds.add(muscleId);
    }

}
