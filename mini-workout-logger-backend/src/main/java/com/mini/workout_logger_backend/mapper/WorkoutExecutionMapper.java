package com.mini.workout_logger_backend.mapper;

import com.mini.java_core.mapper.AbstractMapper;
import com.mini.workout_logger_backend.dto.SetExecutionWriteDTO;
import com.mini.workout_logger_backend.dto.WorkoutExecutionReadDTO;
import com.mini.workout_logger_backend.dto.WorkoutExecutionWriteDTO;
import com.mini.workout_logger_backend.dto.WorkoutExerciseExecutionWriteDTO;
import com.mini.workout_logger_backend.entity.Workout;
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

    public WorkoutExecutionWriteDTO templateFromWorkout(Workout workout) {
        WorkoutExecutionWriteDTO template = new WorkoutExecutionWriteDTO();

        template.setWorkoutExerciseExecutions(
                workout.getWorkoutExercises().stream()
                        .map(ex -> {
                            WorkoutExerciseExecutionWriteDTO weee =
                                    new WorkoutExerciseExecutionWriteDTO();
                            weee.setWorkoutExerciseId(ex.getId());

                            weee.setSetExecutions(
                                    ex.getSets().stream()
                                            .map(set -> {
                                                SetExecutionWriteDTO see =
                                                        new SetExecutionWriteDTO();
                                                see.setSetId(set.getId());
                                                return see;
                                            })
                                            .toList()
                            );

                            return weee;
                        })
                        .toList()
        );

        return template;
    }

}
