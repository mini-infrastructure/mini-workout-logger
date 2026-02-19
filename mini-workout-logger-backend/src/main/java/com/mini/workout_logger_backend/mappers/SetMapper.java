package com.mini.workout_logger_backend.mappers;

import com.mini.java_core.mapper.AbstractMapper;
import com.mini.workout_logger_backend.dtos.SetReadDTO;
import com.mini.workout_logger_backend.dtos.SetWriteDTO;
import com.mini.workout_logger_backend.entities.Set;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class SetMapper extends AbstractMapper<Set, SetReadDTO, SetWriteDTO> {

    @Override
    protected void configure(ModelMapper mapper) {

        // Entity -> DTO (GET)
        mapper.createTypeMap(Set.class, SetReadDTO.class);

        // DTO -> Entity (POST/PUT)
        mapper.createTypeMap(SetWriteDTO.class, Set.class);

    }

}
