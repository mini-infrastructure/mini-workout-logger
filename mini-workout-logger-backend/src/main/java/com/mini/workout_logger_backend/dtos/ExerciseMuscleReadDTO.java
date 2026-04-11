package com.mini.workout_logger_backend.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mini.java_core.dto.ReadDTO;
import com.mini.workout_logger_backend.enums.ExerciseMuscleMovementClassification;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExerciseMuscleReadDTO extends ReadDTO {

    @JsonProperty("muscle_name")
    private String muscleName;

    private ExerciseMuscleMovementClassification role;

}
