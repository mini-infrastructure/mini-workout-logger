package com.mini.workout_logger_backend.mappers;

import com.mini.java_core.mapper.AbstractMapper;
import com.mini.workout_logger_backend.dtos.ExerciseGroupReadDTO;
import com.mini.workout_logger_backend.dtos.ExerciseGroupWriteDTO;
import com.mini.workout_logger_backend.entities.ExerciseGroup;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class ExerciseGroupMapper
        extends AbstractMapper<ExerciseGroup, ExerciseGroupReadDTO, ExerciseGroupWriteDTO> {

    @Override
    protected void configure(ModelMapper mapper) {
        // Entity -> DTO (GET)
        mapper.createTypeMap(ExerciseGroup.class, ExerciseGroupReadDTO.class);

        // DTO -> Entity (POST/PUT)
        mapper.createTypeMap(ExerciseGroupWriteDTO.class, ExerciseGroup.class);
    }

}
