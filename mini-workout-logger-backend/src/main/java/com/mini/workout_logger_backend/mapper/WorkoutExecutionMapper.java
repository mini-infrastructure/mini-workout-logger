package com.mini.workout_logger_backend.mapper;

import com.mini.java_core.mapper.AbstractMapper;
import com.mini.workout_logger_backend.dto.WorkoutExecutionReadDTO;
import com.mini.workout_logger_backend.dto.WorkoutExecutionWriteDTO;
import com.mini.workout_logger_backend.entity.WorkoutExecution;
import com.mini.workout_logger_backend.repository.WorkoutRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class WorkoutExecutionMapper extends AbstractMapper<WorkoutExecution,
                                                           WorkoutExecutionReadDTO,
                                                           WorkoutExecutionWriteDTO> {

    @Autowired
    private WorkoutRepository workoutRepository;

    @Override
    protected void configure(ModelMapper mapper) {

        // Entity -> DTO (GET)
        mapper.createTypeMap(WorkoutExecution.class, WorkoutExecutionReadDTO.class);

        // DTO -> Entity (POST/PUT)
        mapper.createTypeMap(WorkoutExecutionWriteDTO.class, WorkoutExecution.class)
                .setPostConverter(ctx -> {
                    WorkoutExecutionWriteDTO dto = ctx.getSource();
                    WorkoutExecution entity = ctx.getDestination();

                    if (dto.getWorkoutId() != null) {
                        entity.setWorkout(workoutRepository.safeFindById(dto.getWorkoutId()));
                    }

                    return entity;
                });

    }

}
