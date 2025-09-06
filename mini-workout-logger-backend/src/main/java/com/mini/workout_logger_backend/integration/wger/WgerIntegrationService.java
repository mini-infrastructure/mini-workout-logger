package com.mini.workout_logger_backend.integration.wger;

import com.mini.workout_logger_backend.integration.wger.dto.WgerTokenRequestDTO;
import com.mini.workout_logger_backend.integration.wger.dto.WgerTokenResponseDTO;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

/**
 * Service for interacting with the Wger API to fetch exercise data.
 * @see <a href="https://wger.readthedocs.io/en/latest/api/api.html">Wger API Documentation</a>
 */
@Service
@Getter
public class WgerIntegrationService {

    @Autowired
    @Qualifier("WgerWebClient")
    private WebClient webClient;

    @Autowired
    private WgerIntegrationConfig integrationConfig;

    /**
     * Authenticate with the Wger API to obtain an access token.
     * @see <a href="https://wger.readthedocs.io/en/latest/api/api.html#jwt-tokens">JWT Tokens</a>
     *
     * @return the access and refresh tokens response
     */
    public Mono<WgerTokenResponseDTO> authenticate() {
        return this.webClient.post()
                .uri(this.integrationConfig.getTokenUrl())
                .bodyValue(new WgerTokenRequestDTO(
                        this.integrationConfig.getUsername(),
                        this.integrationConfig.getPassword()))
                .retrieve()
                .onStatus(
                        status -> status.is4xxClientError() || status.is5xxServerError(),
                        clientResponse -> clientResponse
                                .bodyToMono(String.class)
                                .flatMap(errorBody -> Mono.error(new RuntimeException(errorBody)))
                )
                .bodyToMono(WgerTokenResponseDTO.class);
    }

}
