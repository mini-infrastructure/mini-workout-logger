package com.mini.workout_logger_backend.integration.wger;

import com.mini.java_core.dto.ResponseDTO;
import com.mini.workout_logger_backend.integration.wger.dto.WgerTokenResponseDTO;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

/**
 * Service for interacting with the Wger API to fetch exercise data.
 * @see <a href="https://wger.readthedocs.io/en/latest/api/api.html">Wger API Documentation</a>
 */
@Service
@AllArgsConstructor
public class WgerApiService {

    @Autowired
    private final RestTemplate restTemplate;

    @Autowired
    private WgerConfig wgerConfig;

    /**
     * Fetches an authentication token from the Wger API.
     * curl --location "https://wger.de/api/v2/token" \
     * --header "Content-Type: application/json" \
     * --data "{
     *     \"username\": \"mini-workout-logger\",
     *     \"password\": \"\!DHesW7as.bXH3x\"
     * }"
     *
     * @return a WgerTokenResponseDTO containing the authentication token
     */
    public ResponseEntity<ResponseDTO<WgerTokenResponseDTO>> getToken() {
        String url = wgerConfig.getTokenUrl();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("username", wgerConfig.getUsername());
        requestBody.put("password", wgerConfig.getPassword());

        HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);

        return restTemplate.exchange(
                url,
                HttpMethod.POST,
                requestEntity,
                new ParameterizedTypeReference<ResponseDTO<WgerTokenResponseDTO>>() {}
        );
    }

}
