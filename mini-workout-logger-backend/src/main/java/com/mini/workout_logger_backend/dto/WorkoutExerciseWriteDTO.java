package com.mini.workout_logger_backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mini.java_core.annotation.ExistsById;
import com.mini.java_core.dto.WriteDTO;
import com.mini.workout_logger_backend.enums.ExerciseEquipment;
import com.mini.workout_logger_backend.repository.ExerciseRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class WorkoutExerciseWriteDTO extends WriteDTO {

    @NotNull
    @ExistsById(repository = ExerciseRepository.class)
    @JsonProperty(value = "exercise_id")
    private Long exerciseId;

    @Valid
    private List<SetWriteDTO> sets;

    private ExerciseEquipment equipment;

    @Min(0)
    @JsonProperty(value = "rest_time_seconds")
    private Integer restTimeSeconds;

}