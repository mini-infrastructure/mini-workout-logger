package com.mini.workout_logger_backend.configurations;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.mini.java_core.enums.TranslatableEnum;
import com.mini.java_core.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jackson.JsonComponent;

import java.io.IOException;

@JsonComponent
public class TranslatableEnumSerializer extends JsonSerializer<TranslatableEnum<?>> {

    @Autowired
    private MessageService messageService;

    @Override
    public void serialize(TranslatableEnum<?> value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        gen.writeString(messageService.getLocalizedMessage(value.getCode()));
    }

}

