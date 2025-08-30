package com.mini.workout_logger_backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mini.java_core.dto.AbstractDTO;
import com.mini.java_core.validation.annotation.ExistsById;
import com.mini.java_core.validation.group.RestMethod;
import com.mini.workout_logger_backend.repository.ExerciseRepository;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ExerciseExecutionDTO extends AbstractDTO {

    @ExistsById(repository = ExerciseRepository.class, groups = RestMethod.All.class)
    @Schema(accessMode = Schema.AccessMode.WRITE_ONLY)
    @JsonProperty(value = "exercise_id", access = JsonProperty.Access.WRITE_ONLY)
    private Long exerciseId;

    @Schema(accessMode = Schema.AccessMode.READ_ONLY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private ExerciseDTO exercise;

    private Integer repetitions;

    private Double weight;

    private String duration;

}
