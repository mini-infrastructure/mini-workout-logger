package com.mini.workout_logger_backend.mappers;

import com.mini.java_core.mapper.AbstractMapper;
import com.mini.workout_logger_backend.dtos.WorkoutExerciseExecutionReadDTO;
import com.mini.workout_logger_backend.dtos.WorkoutExerciseExecutionWriteDTO;
import com.mini.workout_logger_backend.entities.WorkoutExerciseExecution;
import com.mini.workout_logger_backend.repositories.WorkoutExerciseRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class WorkoutExerciseExecutionMapper extends AbstractMapper<WorkoutExerciseExecution,
                                                                   WorkoutExerciseExecutionReadDTO,
                                                                   WorkoutExerciseExecutionWriteDTO> {

    @Autowired
    private WorkoutExerciseRepository workoutExerciseRepository;

    @Override
    protected void configure(ModelMapper mapper) {
        // Entity -> DTO (GET)
        mapper.createTypeMap(WorkoutExerciseExecution.class, WorkoutExerciseExecutionReadDTO.class)
                .addMappings(m -> m.map(
                        src -> src.getWorkoutExercise().getId(),
                        WorkoutExerciseExecutionReadDTO::setWorkoutExerciseId
                ));

        // DTO -> Entity (POST/PUT)
        mapper.createTypeMap(WorkoutExerciseExecutionWriteDTO.class, WorkoutExerciseExecution.class)
                .setPostConverter(ctx -> {
                    WorkoutExerciseExecutionWriteDTO dto = ctx.getSource();
                    WorkoutExerciseExecution entity = ctx.getDestination();

                    if (dto.getWorkoutExerciseId() != null) {
                        entity.setWorkoutExercise(workoutExerciseRepository.safeFindById(dto.getWorkoutExerciseId()));
                    }

                    return entity;
                });
    }
}
