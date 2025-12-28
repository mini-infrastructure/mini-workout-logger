package com.mini.workout_logger_backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SetReorderDTO {

    @NotNull
    @Min(0)
    private Integer newPosition;

}
