package com.mini.workout_logger_backend.integration.wger;

import com.mini.java_core.dto.ResponseDTO;
import com.mini.java_core.validation.group.RestMethod;
import com.mini.workout_logger_backend.integration.wger.dto.WgerTokenRequestDTO;
import com.mini.workout_logger_backend.integration.wger.dto.WgerTokenResponseDTO;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;

/**
 * Service for interacting with the Wger API to fetch exercise data.
 * @see <a href="https://wger.readthedocs.io/en/latest/api/api.html">Wger API Documentation</a>
 */
@Service
@Getter
@Setter
public class WgerApiService {

    @Autowired
    @Qualifier("WgerWebClient")
    private WebClient webClient;

    @Autowired
    private WgerConfig wgerConfig;

    /**
     * Authenticate with the Wger API to obtain an access token.
     * @see <a href="https://wger.readthedocs.io/en/latest/api/api.html#jwt-tokens">JWT Tokens</a>
     *
     * @return the access and refresh tokens response
     */
    public Mono<WgerTokenResponseDTO> authenticate() {
        return webClient.post()
                .uri(wgerConfig.getTokenUrl())
                .bodyValue(new WgerTokenRequestDTO(wgerConfig.getUsername(), wgerConfig.getPassword()))
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
