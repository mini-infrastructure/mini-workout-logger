package com.mini.workout_logger_backend.mapper;

import com.mini.java_core.mapper.AbstractMapper;
import com.mini.workout_logger_backend.dto.WorkoutExerciseExecutionReadDTO;
import com.mini.workout_logger_backend.dto.WorkoutExerciseExecutionWriteDTO;
import com.mini.workout_logger_backend.entity.WorkoutExerciseExecution;
import com.mini.workout_logger_backend.repository.WorkoutExerciseRepository;
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
        mapper.createTypeMap(WorkoutExerciseExecution.class, WorkoutExerciseExecutionReadDTO.class);

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
