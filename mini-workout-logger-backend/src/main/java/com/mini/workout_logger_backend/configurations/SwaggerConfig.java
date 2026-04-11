package com.mini.workout_logger_backend.configurations;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.media.StringSchema;
import io.swagger.v3.oas.models.parameters.Parameter;
import org.springdoc.core.customizers.OpenApiCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI headerConfiguration() {
        return new OpenAPI()
                .info(new Info()
                        .title("🤸 Mini Workout Logger")
                        .version("v1.0.0"));
    }

    @Bean
    public OpenApiCustomizer languageConfiguration() {
        return openApi -> {
            openApi.getPaths().values().forEach(pathItem -> {
                pathItem.readOperations().forEach(operation -> {
                    operation.addParametersItem(new Parameter()
                            .name("lang")
                            .description("Language")
                            .in("query")
                            .required(false)
                            .schema(new StringSchema()
                                    ._enum(List.of("pt_BR", "en_US"))
                                    ._default("en_US")));
                });
            });
        };
    }

}
