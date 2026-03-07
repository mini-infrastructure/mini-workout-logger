package com.mini.workout_logger_backend.dtos;

import com.mini.java_core.annotation.ExistsById;
import com.mini.java_core.dto.WriteDTO;
import com.mini.java_core.validation.group.RestMethod;
import com.mini.workout_logger_backend.enums.ExerciseMuscleMovementClassification;
import com.mini.workout_logger_backend.repositories.MuscleRepository;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExerciseMuscleWriteDTO extends WriteDTO {

    @ExistsById(repository = MuscleRepository.class)
    @NotNull(groups = RestMethod.OnCreate.class)
    private Long muscleId;

    @NotNull(groups = RestMethod.OnCreate.class)
    private ExerciseMuscleMovementClassification role;

}
