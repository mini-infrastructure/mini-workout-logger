package com.mini.workout_logger_backend.mapper;

import com.mini.java_core.entity.Text;
import com.mini.java_core.mapper.AbstractMapper;
import com.mini.workout_logger_backend.dto.ExerciseReadDTO;
import com.mini.workout_logger_backend.dto.ExerciseWriteDTO;
import com.mini.workout_logger_backend.entity.Exercise;
import com.mini.workout_logger_backend.repository.MuscleRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashSet;

@Component
public class ExerciseMapper
        extends AbstractMapper<Exercise, ExerciseReadDTO, ExerciseWriteDTO> {


    @Autowired
    MuscleRepository muscleRepository;

    @Override
    protected void configure(ModelMapper mapper) {

        // Entity -> DTO (GET)
        mapper.createTypeMap(Exercise.class, ExerciseReadDTO.class);

        // DTO -> Entity (POST/PUT)
        mapper.createTypeMap(ExerciseWriteDTO.class, Exercise.class)
                .setPostConverter(ctx -> {
                    ExerciseWriteDTO dto = ctx.getSource();
                    Exercise entity = ctx.getDestination();

                    if (dto.getName() != null) {
                        entity.setName(new Text(dto.getName()));
                    }

                    if (dto.getMuscleIds() != null) {
                        entity.setMuscles(
                                muscleRepository.safeFindByIds(
                                        dto.getMuscleIds(),
                                        HashSet::new)
                        );
                    }

                    return entity;
                });

    }

}
