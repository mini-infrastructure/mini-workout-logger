package com.mini.workout_logger_backend.mapper;

import com.mini.java_core.mapper.AbstractMapper;
import com.mini.workout_logger_backend.dto.WorkoutReadDTO;
import com.mini.workout_logger_backend.dto.WorkoutWriteDTO;
import com.mini.workout_logger_backend.entity.Workout;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class WorkoutMapper extends AbstractMapper<Workout, WorkoutReadDTO, WorkoutWriteDTO> {

    @Override
    protected void configure(ModelMapper mapper) {

        // Entity -> DTO (GET)
        mapper.createTypeMap(Workout.class, WorkoutReadDTO.class);

        // DTO -> Entity (POST/PUT)
        mapper.createTypeMap(WorkoutWriteDTO.class, Workout.class)
                .setPostConverter(ctx -> {
                    WorkoutWriteDTO dto = ctx.getSource();
                    Workout entity = ctx.getDestination();

                    if (dto.getName() != null) {
                        entity.setName(new com.mini.java_core.entity.Text(dto.getName()));
                    }

                    return entity;
                });
    }

}
