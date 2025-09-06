package com.mini.workout_logger_backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mini.java_core.dto.AbstractDTO;
import com.mini.java_core.validation.group.RestMethod;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseDTO extends AbstractDTO {

    @NotNull(groups = RestMethod.OnCreate.class)
    private String name;

    private String category;

    @Schema(accessMode = Schema.AccessMode.WRITE_ONLY)
    @JsonProperty(value = "muscle_group_ids", access = JsonProperty.Access.WRITE_ONLY)
    private Set<Long> muscleGroupIds = new HashSet<>();

    @Schema(accessMode = Schema.AccessMode.READ_ONLY)
    @JsonProperty(value = "muscle_groups", access = JsonProperty.Access.READ_ONLY)
    private Set<MuscleGroupDTO> muscleGroups = new HashSet<>();

    public void addMuscleGroupId(Long muscleGroupId) {
        this.muscleGroupIds.add(muscleGroupId);
    }

}
