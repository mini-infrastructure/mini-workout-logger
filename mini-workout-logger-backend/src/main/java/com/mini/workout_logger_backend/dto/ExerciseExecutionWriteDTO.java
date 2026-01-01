package com.mini.workout_logger_backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mini.java_core.annotation.ExistsById;
import com.mini.java_core.dto.WriteDTO;
import com.mini.java_core.validation.group.RestMethod;
import com.mini.workout_logger_backend.enums.ExerciseEquipment;
import com.mini.workout_logger_backend.repository.ExerciseRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExerciseExecutionWriteDTO extends WriteDTO {

    @ExistsById(repository = ExerciseRepository.class, groups = RestMethod.All.class)
    @JsonProperty(value = "exercise_id")
    private Long exerciseId;

    @Valid
    private List<SetWriteDTO> sets = new ArrayList<>();

    private ExerciseEquipment equipment;

    @Min(0)
    @JsonProperty(value = "rest_time_seconds")
    private Integer restTimeSeconds;

    public ExerciseExecutionWriteDTO(Long exerciseId) {
        this.exerciseId = exerciseId;
    }

    public void addSet(SetWriteDTO set) {
        this.sets.add(set);
    }

}