package com.mini.workout_logger_backend.mapper;

import com.mini.java_core.mapper.AbstractMapper;
import com.mini.workout_logger_backend.dto.ExerciseDTO;
import com.mini.workout_logger_backend.entity.Exercise;
import com.mini.workout_logger_backend.entity.MuscleGroup;
import com.mini.workout_logger_backend.repository.MuscleGroupRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ExerciseMapper extends AbstractMapper<Exercise, ExerciseDTO> {

    @Autowired
    MuscleGroupRepository muscleGroupRepository;

    @Override
    protected Class<ExerciseDTO> getDtoClass() { return ExerciseDTO.class; }

    @Override
    protected Class<Exercise> getEntityClass() { return Exercise.class; }

    @Override
    protected void configure(ModelMapper mapper) {

        // Entity -> DTO (GET)
        mapper.createTypeMap(Exercise.class, ExerciseDTO.class)
                .addMappings(m -> {
                    m.skip(ExerciseDTO::setMuscleGroupIds);
                })
                .setPostConverter(ctx -> {
                    Exercise entity = ctx.getSource();
                    ExerciseDTO dto = ctx.getDestination();
                    if (entity.getMuscleGroups() != null) {
                        entity.getMuscleGroups().forEach(mg -> {
                            dto.addMuscleGroupId(mg.getId());
                        });
                    }
                    return dto;
                });

        // DTO -> Entity (POST/PUT)
        mapper.createTypeMap(ExerciseDTO.class, Exercise.class)
                .setPostConverter(ctx -> {
                    ExerciseDTO dto = ctx.getSource();
                    Exercise entity = ctx.getDestination();
                    if (dto.getMuscleGroupIds() != null) {
                        dto.getMuscleGroupIds().forEach(id -> {
                            MuscleGroup mg = muscleGroupRepository.safeFindById(id);
                            entity.addMuscleGroup(mg);
                        });
                    }
                    return entity;
                });

    }

}
