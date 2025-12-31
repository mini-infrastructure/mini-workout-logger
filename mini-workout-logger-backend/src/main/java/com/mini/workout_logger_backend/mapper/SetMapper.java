package com.mini.workout_logger_backend.mapper;

import com.mini.java_core.mapper.AbstractMapper;
import com.mini.workout_logger_backend.dto.SetReadDTO;
import com.mini.workout_logger_backend.dto.SetWriteDTO;
import com.mini.workout_logger_backend.entity.Set;
import com.mini.workout_logger_backend.repository.ExerciseExecutionRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SetMapper extends AbstractMapper<Set, SetReadDTO, SetWriteDTO> {

    @Autowired
    ExerciseExecutionRepository exerciseExecutionRepository;

    @Override
    protected void configure(ModelMapper mapper) {

        // Entity -> DTO (GET)
        mapper.createTypeMap(Set.class, SetReadDTO.class);

        // DTO -> Entity (POST/PUT)
        mapper.createTypeMap(SetWriteDTO.class, Set.class);

    }

}
