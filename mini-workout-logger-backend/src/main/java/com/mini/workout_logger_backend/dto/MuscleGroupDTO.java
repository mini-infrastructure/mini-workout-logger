package com.mini.workout_logger_backend.dto;

import com.mini.java_core.dto.AbstractDTO;
import com.mini.java_core.validation.group.RestMethod;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class MuscleGroupDTO extends AbstractDTO {

    @NotNull(groups = RestMethod.OnCreate.class)
    private String name;

}
