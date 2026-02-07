package com.mini.workout_logger_backend.mappers;

import com.mini.java_core.mapper.AbstractMapper;
import com.mini.workout_logger_backend.dtos.SetExecutionReadDTO;
import com.mini.workout_logger_backend.dtos.SetExecutionWriteDTO;
import com.mini.workout_logger_backend.entities.SetExecution;
import com.mini.workout_logger_backend.repositories.SetRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SetExecutionMapper extends AbstractMapper<SetExecution,
                                                       SetExecutionReadDTO,
                                                       SetExecutionWriteDTO> {

    @Autowired
    SetRepository setRepository;

    @Override
    protected void configure(ModelMapper mapper) {
        // Entity -> DTO (GET)
        mapper.createTypeMap(SetExecution.class, SetExecutionReadDTO.class);

        // DTO -> Entity (POST/PUT)
        mapper.createTypeMap(SetExecutionWriteDTO.class, SetExecution.class)
                .setPostConverter(ctx -> {
                    SetExecutionWriteDTO dto = ctx.getSource();
                    SetExecution entity = ctx.getDestination();

                    if (dto.getSetId() != null) {
                        entity.setSet(setRepository.safeFindById(dto.getSetId()));
                    }

                    return entity;
                });
    }
}
