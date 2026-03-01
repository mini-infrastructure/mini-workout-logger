package com.mini.workout_logger_backend.mappers;

import com.mini.java_core.entity.Text;
import com.mini.java_core.mapper.AbstractMapper;
import com.mini.workout_logger_backend.dtos.ExerciseReadDTO;
import com.mini.workout_logger_backend.dtos.ExerciseWriteDTO;
import com.mini.workout_logger_backend.dtos.MuscleReadDTO;
import com.mini.workout_logger_backend.entities.Exercise;
import com.mini.workout_logger_backend.entities.Muscle;
import com.mini.workout_logger_backend.repositories.MuscleRepository;
import com.mini.workout_logger_backend.services.MuscleService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class ExerciseMapper
        extends AbstractMapper<Exercise, ExerciseReadDTO, ExerciseWriteDTO> {


    @Autowired
    MuscleRepository muscleRepository;

    @Autowired
    MuscleService muscleService;

    @Autowired
    MuscleMapper muscleMapper;

    @Override
    protected void configure(ModelMapper mapper) {

        // Entity -> DTO (GET)
        mapper.createTypeMap(Exercise.class, ExerciseReadDTO.class)
                .setPostConverter(ctx -> {
                    Exercise entity = ctx.getSource();
                    ExerciseReadDTO dto = ctx.getDestination();

                    if (!entity.getMuscles().isEmpty()) {
                        Set< MuscleReadDTO> rootMuscles = muscleMapper.toDTO(muscleService.findRootMuscles(entity.getMuscles()));
                        dto.setRootMuscles(rootMuscles.stream()
                                .map(MuscleReadDTO::getName)
                                .collect(Collectors.toSet()));
                    }

                    return dto;
                });

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
