package com.mini.workout_logger_backend.mappers;

import com.mini.java_core.entity.Text;
import com.mini.java_core.mapper.AbstractMapper;
import com.mini.workout_logger_backend.dtos.MuscleReadDTO;
import com.mini.workout_logger_backend.dtos.MuscleWriteDTO;
import com.mini.workout_logger_backend.entities.Muscle;
import com.mini.workout_logger_backend.repositories.MuscleRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashSet;

import static java.util.stream.Collectors.toCollection;

@Component
public class MuscleMapper extends AbstractMapper<Muscle, MuscleReadDTO, MuscleWriteDTO> {

    @Autowired
    MuscleRepository muscleRepository;

    @Override
    protected void configure(ModelMapper mapper) {

        // Entity -> DTO (GET)
        mapper.createTypeMap(Muscle.class, MuscleReadDTO.class);

        // DTO -> Entity (POST/PUT)
        mapper.createTypeMap(MuscleWriteDTO.class, Muscle.class)
                .setPostConverter(ctx -> {
                    MuscleWriteDTO dto = ctx.getSource();
                    Muscle entity = ctx.getDestination();

                    if (dto.getName() != null) {
                        entity.setName(new Text(dto.getName()));
                    }

                    if (dto.getMuscleGroupIds() != null) {
                        entity.setMuscleGroups(
                                muscleRepository.safeFindByIds(
                                        dto.getMuscleGroupIds(),
                                        HashSet::new)
                        );
                    }

                    return entity;
                });

    }

}
