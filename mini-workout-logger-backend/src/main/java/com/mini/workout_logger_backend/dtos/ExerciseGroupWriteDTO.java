package com.mini.workout_logger_backend.dtos;

import com.mini.java_core.dto.WriteDTO;
import com.mini.java_core.validation.group.RestMethod;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExerciseGroupWriteDTO extends WriteDTO {

    @NotNull(groups = RestMethod.OnCreate.class)
    private String name;

}
