package com.mini.workout_logger_backend.dtos;

import com.mini.java_core.dto.WriteDTO;
import com.mini.java_core.validation.group.RestMethod;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardWriteDTO extends WriteDTO {

    @NotNull(groups = RestMethod.OnCreate.class)
    private String name;

    @Min(1)
    private int columns = 6;

}
