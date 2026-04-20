package com.mini.workout_logger_backend.mappers;

import com.mini.java_core.mapper.AbstractMapper;
import com.mini.workout_logger_backend.dtos.WorkoutExerciseReadDTO;
import com.mini.workout_logger_backend.dtos.WorkoutExerciseWriteDTO;
import com.mini.workout_logger_backend.entities.WorkoutExercise;
import com.mini.workout_logger_backend.repositories.ExerciseRepository;
import com.mini.workout_logger_backend.repositories.SetRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class WorkoutExerciseMapper extends AbstractMapper<WorkoutExercise,
                                                          WorkoutExerciseReadDTO,
                                                          WorkoutExerciseWriteDTO> {

    @Autowired
    ExerciseRepository exerciseRepository;

    @Autowired
    SetRepository setRepository;

    @Autowired
    ExerciseMapper exerciseMapper;

    @Override
    protected void configure(ModelMapper mapper) {

        // Entity -> DTO (GET)
        mapper.createTypeMap(WorkoutExercise.class, WorkoutExerciseReadDTO.class)
                .setPostConverter(ctx -> {
                    WorkoutExercise entity = ctx.getSource();
                    WorkoutExerciseReadDTO dto = ctx.getDestination();
                    dto.setExercise(exerciseMapper.toDTO(entity.getExercise()));
                    return dto;
                });

        // DTO -> Entity (POST/PUT)
        mapper.createTypeMap(WorkoutExerciseWriteDTO.class, WorkoutExercise.class)
                .setPostConverter(ctx -> {
                    WorkoutExerciseWriteDTO dto = ctx.getSource();
                    WorkoutExercise entity = ctx.getDestination();

                    if (dto.getExerciseId() != null) {
                        entity.setExercise(exerciseRepository.safeFindById(dto.getExerciseId()));
                    }

                    return entity;
                });
    }

}
