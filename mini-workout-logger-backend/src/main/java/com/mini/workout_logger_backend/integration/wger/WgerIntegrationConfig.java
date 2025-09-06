package com.mini.workout_logger_backend.integration.wger;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
@ConfigurationProperties("com.mini.workout-logger.integration.wger")
@Getter
@Setter
public class WgerIntegrationConfig {

    private String endpoint;

    private String username;

    private String password;

    /**
     * WebClient for interacting with the Wger API.
     *
     * @return the configured WebClient
     */
    @Bean(name = "WgerWebClient")
    public WebClient webClient() {
        return WebClient
                .builder()
                .baseUrl(this.endpoint)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

    public String getTokenUrl() {
        return "/token";
    }

    public String getExerciseUrl() { return "/exercise"; }

}
