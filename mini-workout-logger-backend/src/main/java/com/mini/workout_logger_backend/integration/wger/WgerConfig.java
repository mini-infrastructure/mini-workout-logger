package com.mini.workout_logger_backend.integration.wger;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties("com.mini.workout-logger.integration.wger")
@Getter
@Setter
public class WgerConfig {

    private String endpoint;

    private String username;

    private String password;

    public String getTokenUrl() {
        return endpoint.endsWith("/") ? endpoint + "token" : endpoint + "/token";
    }

}
