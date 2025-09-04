package com.mini.workout_logger_backend.integration.wger;

import com.mini.java_core.dto.ResponseDTO;
import com.mini.workout_logger_backend.integration.wger.dto.WgerTokenResponseDTO;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/wger")
@Tag(name = "Wger API", description = "Wger API Integration")
public class WgerApiController {

    @Autowired
    private WgerApiService wgerApiService;

    /**
     * curl --location "https://wger.de/api/v2/token" \
     * --header "Content-Type: application/json" \
     * --header "Cookie: sessionid=6gnz7xciahj6bivshcrnh0tykubcvkxb" \
     * --data "{
     *     \"username\": \"mini-workout-logger\",
     *     \"password\": \"\!DHesW7as.bXH3x\"
     * }"
     */
    @PostMapping("/token")
    public ResponseEntity<ResponseDTO<WgerTokenResponseDTO>> getToken() {
        return wgerApiService.getToken();
    }

}
