package com.mini.workout_logger_backend.mappers;

import com.mini.java_core.mapper.AbstractMapper;
import com.mini.workout_logger_backend.dtos.ActivityLogReadDTO;
import com.mini.workout_logger_backend.dtos.ActivityLogWriteDTO;
import com.mini.workout_logger_backend.entities.ActivityLog;
import com.mini.workout_logger_backend.repositories.ExerciseRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ActivityLogMapper extends AbstractMapper<ActivityLog, ActivityLogReadDTO, ActivityLogWriteDTO> {

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Override
    protected void configure(ModelMapper mapper) {

        // Entity -> ReadDTO
        mapper.createTypeMap(ActivityLog.class, ActivityLogReadDTO.class)
                .setPostConverter(ctx -> {
                    ActivityLog entity = ctx.getSource();
                    ActivityLogReadDTO dto = ctx.getDestination();

                    if (entity.getExercise() != null) {
                        dto.setExerciseId(entity.getExercise().getId());
                        dto.setExerciseName(entity.getExercise().getName().getValue());
                        if (entity.getExercise().getCategory() != null) {
                            dto.setExerciseCategory(entity.getExercise().getCategory().name());
                        }
                    }
                    dto.setStartTime(entity.getStartTime());
                    dto.setDurationSeconds(entity.getDurationSeconds());
                    dto.setCompleted(entity.isCompleted());
                    return dto;
                });

        // WriteDTO -> Entity
        mapper.createTypeMap(ActivityLogWriteDTO.class, ActivityLog.class)
                .setPostConverter(ctx -> {
                    ActivityLogWriteDTO dto = ctx.getSource();
                    ActivityLog entity = ctx.getDestination();

                    if (dto.getExerciseId() != null) {
                        entity.setExercise(exerciseRepository.safeFindById(dto.getExerciseId()));
                    }
                    if (dto.getStartTime() != null) {
                        entity.setStartTime(dto.getStartTime());
                    }
                    if (dto.getDurationSeconds() != null) {
                        entity.setDurationSeconds(dto.getDurationSeconds());
                    }
                    if (dto.getCompleted() != null) {
                        entity.setCompleted(dto.getCompleted());
                    }
                    return entity;
                });
    }

}
