package com.mini.workout_logger_backend.integration.wger.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WgerTokenResponseDTO {

    @JsonProperty("access")
    private String access_token;

    @JsonProperty("refresh")
    private String refresh_token;

}
