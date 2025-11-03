package com.mini.workout_logger_backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mini.java_core.dto.AbstractDTO;
import com.mini.java_core.validation.annotation.ExistsById;
import com.mini.java_core.validation.group.RestMethod;
import com.mini.workout_logger_backend.enums.ExerciseEquipment;
import com.mini.workout_logger_backend.repository.ExerciseRepository;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseExecutionDTO extends AbstractDTO {

    @NotNull(groups = RestMethod.OnCreate.class)
    @ExistsById(repository = ExerciseRepository.class, groups = RestMethod.All.class)
    @Schema(accessMode = Schema.AccessMode.WRITE_ONLY)
    @JsonProperty(value = "exercise_id", access = JsonProperty.Access.WRITE_ONLY)
    private Long exerciseId;

    // TODO: Consertar problema de visualização.
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @Schema(accessMode = Schema.AccessMode.READ_ONLY)
    private ExerciseDTO exercise;

    @Schema(accessMode = Schema.AccessMode.WRITE_ONLY)
    @JsonProperty(value = "set_ids", access = JsonProperty.Access.WRITE_ONLY)
    private List<Long> setIds = new ArrayList<>();

    @Schema(accessMode = Schema.AccessMode.READ_ONLY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private List<SetDTO> sets = new ArrayList<>();

    private ExerciseEquipment equipment;

    private Integer restTimeSeconds;

    public void addSetId(Long setId) {
        this.setIds.add(setId);
    }

}
