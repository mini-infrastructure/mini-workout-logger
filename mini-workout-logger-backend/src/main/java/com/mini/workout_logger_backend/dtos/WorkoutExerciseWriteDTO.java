package com.mini.workout_logger_backend.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mini.java_core.annotation.ExistsById;
import com.mini.java_core.dto.WriteDTO;
import com.mini.java_core.validation.group.RestMethod;
import com.mini.workout_logger_backend.annotations.WorkoutExerciseValidated;
import com.mini.workout_logger_backend.enums.ExerciseEquipment;
import com.mini.workout_logger_backend.enums.WorkoutExerciseRole;
import com.mini.workout_logger_backend.repositories.ExerciseRepository;
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
@WorkoutExerciseValidated
public class WorkoutExerciseWriteDTO extends WriteDTO {

    @NotNull(groups = RestMethod.OnCreate.class)
    @ExistsById(repository = ExerciseRepository.class)
    @JsonProperty("exercise_id")
    private Long exerciseId;

    @Valid
    private List<SetWriteDTO> sets;

    @Min(0)
    @JsonProperty("rest_time_seconds")
    private Integer restTimeSeconds;

    private WorkoutExerciseRole role;

}