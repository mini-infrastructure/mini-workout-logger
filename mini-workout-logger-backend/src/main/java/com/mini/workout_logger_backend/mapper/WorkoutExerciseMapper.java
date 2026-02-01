package com.mini.workout_logger_backend.mapper;

import com.mini.java_core.mapper.AbstractMapper;
import com.mini.workout_logger_backend.dto.WorkoutExerciseReadDTO;
import com.mini.workout_logger_backend.dto.WorkoutExerciseWriteDTO;
import com.mini.workout_logger_backend.entity.WorkoutExercise;
import com.mini.workout_logger_backend.repository.ExerciseRepository;
import com.mini.workout_logger_backend.repository.SetRepository;
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

    @Override
    protected void configure(ModelMapper mapper) {

        // Entity -> DTO (GET)
        mapper.createTypeMap(WorkoutExercise.class, WorkoutExerciseReadDTO.class);

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
