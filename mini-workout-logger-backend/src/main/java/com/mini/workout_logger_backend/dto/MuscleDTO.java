package com.mini.workout_logger_backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mini.java_core.dto.AbstractDTO;
import com.mini.java_core.validation.annotation.ExistsById;
import com.mini.java_core.validation.group.RestMethod;
import com.mini.workout_logger_backend.repository.MuscleRepository;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class MuscleDTO extends AbstractDTO {

    @NotNull(groups = RestMethod.OnCreate.class)
    private String name;

    @ExistsById(repository = MuscleRepository.class, groups = RestMethod.All.class)
    @Schema(accessMode = Schema.AccessMode.WRITE_ONLY)
    @JsonProperty(value = "muscle_group_id", access = JsonProperty.Access.WRITE_ONLY)
    private Long muscleGroupId;

    @Schema(accessMode = Schema.AccessMode.READ_ONLY)
    @JsonProperty(value = "muscle_group", access = JsonProperty.Access.READ_ONLY)
    private MuscleDTO muscleGroup;

}
