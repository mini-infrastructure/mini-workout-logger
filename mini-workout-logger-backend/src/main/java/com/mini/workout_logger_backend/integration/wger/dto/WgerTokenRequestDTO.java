package com.mini.workout_logger_backend.integration.wger.dto;

import com.mini.java_core.validation.group.RestMethod;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WgerTokenRequestDTO {

    @NotNull(groups = RestMethod.OnCreate.class)
    private String username;

    @NotNull(groups = RestMethod.OnCreate.class)
    private String password;

}
