package com.mini.workout_logger_backend.integration.wger;

import com.mini.java_core.dto.ResponseDTO;
import com.mini.java_core.entity.ResponseHelper;
import com.mini.java_core.enums.ResponseMessage;
import com.mini.workout_logger_backend.integration.wger.dto.WgerTokenResponseDTO;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/wger")
@Tag(name = "Wger API", description = "Wger API Integration")
public class WgerIntegrationController {

    @Autowired
    private WgerIntegrationService integrationService;

    @PostMapping("/token")
    public ResponseEntity<ResponseDTO<WgerTokenResponseDTO>> getToken() {
        WgerTokenResponseDTO token = integrationService.authenticate().block();
        assert token != null;
        return ResponseHelper.success(
                HttpStatus.OK,
                ResponseMessage.OK.getMessage(),
                List.of(token));
    }

}
