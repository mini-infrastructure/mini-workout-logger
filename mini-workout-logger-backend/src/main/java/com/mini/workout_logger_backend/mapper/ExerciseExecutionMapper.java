package com.mini.workout_logger_backend.mapper;

import com.mini.java_core.mapper.AbstractMapper;
import com.mini.workout_logger_backend.dto.ExerciseExecutionDTO;
import com.mini.workout_logger_backend.entity.Exercise;
import com.mini.workout_logger_backend.entity.ExerciseExecution;
import com.mini.workout_logger_backend.repository.ExerciseRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ExerciseExecutionMapper extends AbstractMapper<ExerciseExecution, ExerciseExecutionDTO> {

    @Autowired
    ExerciseRepository exerciseRepository;

    @Override
    protected void configure(ModelMapper mapper) {
        // Entity -> DTO (GET)
        mapper.createTypeMap(ExerciseExecution.class, ExerciseExecutionDTO.class)
                .addMappings(m -> {
                    m.skip(ExerciseExecutionDTO::setExerciseId);
                })
                .setPostConverter(ctx -> {
                    ExerciseExecution entity = ctx.getSource();
                    ExerciseExecutionDTO dto = ctx.getDestination();
                    if (entity.getExercise() != null) {
                        dto.setExerciseId(entity.getExercise().getId());
                    }
                    return dto;
                });

        // DTO -> Entity (POST/PUT)
        mapper.createTypeMap(ExerciseExecutionDTO.class, ExerciseExecution.class)
                .setPostConverter(ctx -> {
                    ExerciseExecutionDTO dto = ctx.getSource();
                    ExerciseExecution entity = ctx.getDestination();
                    if (dto.getExerciseId() != null) {
                        Exercise exercise = exerciseRepository.safeFindById(dto.getExerciseId());
                        entity.setExercise(exercise);
                    }
                    return entity;
                });

    }

}
