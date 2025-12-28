package com.mini.workout_logger_backend.mapper;

import com.mini.java_core.mapper.AbstractMapper;
import com.mini.workout_logger_backend.dto.ExerciseExecutionReadDTO;
import com.mini.workout_logger_backend.dto.ExerciseExecutionWriteDTO;
import com.mini.workout_logger_backend.entity.ExerciseExecution;
import com.mini.workout_logger_backend.repository.ExerciseRepository;
import com.mini.workout_logger_backend.repository.SetRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class ExerciseExecutionMapper extends AbstractMapper<ExerciseExecution,
                                                            ExerciseExecutionReadDTO,
                                                            ExerciseExecutionWriteDTO> {

    @Autowired
    ExerciseRepository exerciseRepository;

    @Autowired
    SetRepository setRepository;

    @Override
    protected void configure(ModelMapper mapper) {
        // Entity -> DTO (GET)
        mapper.createTypeMap(ExerciseExecution.class, ExerciseExecutionReadDTO.class);

        // DTO -> Entity (POST/PUT)
        mapper.createTypeMap(ExerciseExecutionWriteDTO.class, ExerciseExecution.class)
                .setPostConverter(ctx -> {
                    ExerciseExecutionWriteDTO dto = ctx.getSource();
                    ExerciseExecution entity = ctx.getDestination();

                    if (dto.getExerciseId() != null) {
                        entity.setExercise(
                                exerciseRepository.safeFindById(dto.getExerciseId())
                        );
                    }

                    return entity;
                    });
        }

}
