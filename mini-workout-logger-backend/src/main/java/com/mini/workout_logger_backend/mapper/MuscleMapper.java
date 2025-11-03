package com.mini.workout_logger_backend.mapper;

import com.mini.java_core.mapper.AbstractMapper;
import com.mini.workout_logger_backend.dto.MuscleDTO;
import com.mini.workout_logger_backend.entity.Muscle;
import com.mini.workout_logger_backend.repository.MuscleRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashSet;

@Component
public class MuscleMapper extends AbstractMapper<Muscle, MuscleDTO> {

    @Autowired
    MuscleRepository muscleRepository;

    @Override
    protected void configure(ModelMapper mapper) {

        // Entity -> DTO (GET)
        mapper.createTypeMap(Muscle.class, MuscleDTO.class)
                .addMappings(m -> {
                    m.skip(MuscleDTO::setMuscleGroupIds);
                })
                .setPostConverter(ctx -> {
                    Muscle entity = ctx.getSource();
                    MuscleDTO dto = ctx.getDestination();
                    if (entity.getMuscleGroups() != null) {
                        entity.getMuscleGroups().forEach(muscleGroup -> {
                            dto.addMuscleGroupId(muscleGroup.getId());
                        });
                    }
                    return dto;
                });

        // DTO -> Entity (POST/PUT)
        mapper.createTypeMap(MuscleDTO.class, Muscle.class)
                .setPostConverter(ctx -> {
                    MuscleDTO dto = ctx.getSource();
                    Muscle entity = ctx.getDestination();
                    if (dto.getMuscleGroupIds() != null) {
                        entity.setMuscleGroups(muscleRepository.safeFindByIds(dto.getMuscleGroupIds(), HashSet::new));
                    }
                    return entity;
                });

    }

}
