package com.mini.workout_logger_backend.integration.wger.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WgerTokenResponseDTO {

    private String access_token;

    private String refresh_token;

}
