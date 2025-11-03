package com.mini.workout_logger_backend.mapper;

import com.mini.java_core.mapper.AbstractMapper;
import com.mini.workout_logger_backend.dto.SetDTO;
import com.mini.workout_logger_backend.entity.Set;
import com.mini.workout_logger_backend.repository.ExerciseExecutionRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SetMapper extends AbstractMapper<Set, SetDTO> {

    @Autowired
    ExerciseExecutionRepository exerciseExecutionRepository;

    @Override
    protected void configure(ModelMapper mapper) {

        // Entity -> DTO (GET)
        mapper.createTypeMap(Set.class, SetDTO.class)
                .addMappings(m -> {
                    m.skip(SetDTO::setExerciseExecutionId);
                })
                .setPostConverter(ctx -> {
                    Set entity = ctx.getSource();
                    SetDTO dto = ctx.getDestination();
                    if (entity.getExerciseExecution() != null) {
                        dto.setExerciseExecutionId(entity.getExerciseExecution().getId());
                    }
                    return dto;
                });

        // DTO -> Entity (POST/PUT)
        mapper.createTypeMap(SetDTO.class, Set.class)
                .setPostConverter(ctx -> {
                    SetDTO dto = ctx.getSource();
                    Set entity = ctx.getDestination();
                    if (dto.getExerciseExecutionId() != null) {
                        entity.setExerciseExecution(exerciseExecutionRepository.safeFindById(dto.getExerciseExecutionId()));
                    }
                    return entity;
                });

    }

}
