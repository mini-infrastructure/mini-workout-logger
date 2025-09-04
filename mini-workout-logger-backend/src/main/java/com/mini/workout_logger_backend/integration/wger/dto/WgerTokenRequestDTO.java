package com.mini.workout_logger_backend.integration.wger.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WgerTokenRequestDTO {

    private String username;

    private String password;

}
