package com.mini.workout_logger_backend.mappers;

import com.mini.java_core.mapper.AbstractMapper;
import com.mini.workout_logger_backend.dtos.ExerciseMuscleReadDTO;
import com.mini.workout_logger_backend.dtos.ExerciseMuscleWriteDTO;
import com.mini.workout_logger_backend.entities.ExerciseMuscle;
import com.mini.workout_logger_backend.repositories.ExerciseRepository;
import com.mini.workout_logger_backend.repositories.MuscleRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ExerciseMuscleMapper
        extends AbstractMapper<ExerciseMuscle, ExerciseMuscleReadDTO, ExerciseMuscleWriteDTO> {

    @Autowired
    ExerciseRepository exerciseRepository;

    @Autowired
    MuscleRepository muscleRepository;

    @Override
    protected void configure(ModelMapper mapper) {
        // Entity -> DTO (GET)
        mapper.createTypeMap(ExerciseMuscle.class, ExerciseMuscleReadDTO.class)
                .addMappings(m -> {
                    m.map(src -> src.getMuscle().getName().getValue(),
                            ExerciseMuscleReadDTO::setMuscleName);
                    m.map(src -> src.getMuscle().getName().getCode(),
                            ExerciseMuscleReadDTO::setMuscleCode);
                });

        // DTO -> Entity (POST/PUT)
        mapper.createTypeMap(ExerciseMuscleWriteDTO.class, ExerciseMuscle.class)
                .setPostConverter(ctx -> {
                    ExerciseMuscleWriteDTO dto = ctx.getSource();
                    ExerciseMuscle entity = ctx.getDestination();

                    if (dto.getMuscleId() != null) {
                        entity.setMuscle(muscleRepository.safeFindById(dto.getMuscleId()));
                    }

                    return entity;
                });
    }

}
