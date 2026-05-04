package com.mini.workout_logger_backend.mappers;

import com.mini.java_core.dto.MediaReadDTO;
import com.mini.java_core.entity.Text;
import com.mini.java_core.mapper.AbstractMapper;
import com.mini.workout_logger_backend.dtos.ExerciseGroupWriteDTO;
import com.mini.workout_logger_backend.dtos.ExerciseReadDTO;
import com.mini.workout_logger_backend.dtos.ExerciseWriteDTO;
import com.mini.workout_logger_backend.dtos.MuscleReadDTO;
import com.mini.workout_logger_backend.entities.Exercise;
import com.mini.workout_logger_backend.entities.ExerciseGroup;
import com.mini.workout_logger_backend.entities.ExerciseMedia;
import com.mini.workout_logger_backend.entities.Muscle;
import com.mini.workout_logger_backend.enums.ExerciseMediaRole;
import com.mini.workout_logger_backend.enums.ExerciseMuscleMovementClassification;
import com.mini.workout_logger_backend.repositories.ExerciseGroupRepository;
import com.mini.workout_logger_backend.repositories.ExerciseMediaRepository;
import com.mini.workout_logger_backend.repositories.MuscleRepository;
import com.mini.workout_logger_backend.services.MuscleService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.HashSet;
import java.util.LinkedHashSet;
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

    @Autowired
    ExerciseMuscleMapper exerciseMuscleMapper;

    @Autowired
    ExerciseGroupMapper exerciseGroupMapper;

    @Autowired
    ExerciseGroupRepository exerciseGroupRepository;

    @Autowired
    ExerciseMediaRepository exerciseMediaRepository;

    private MediaReadDTO toMediaDTO(ExerciseMedia media) {
        MediaReadDTO dto = new MediaReadDTO();
        dto.setId(media.getId());
        dto.setFilename(media.getFilename());
        dto.setContentType(media.getContentType());
        dto.setSize(media.getSize());
        dto.setData(Base64.getEncoder().encodeToString(media.getContent()));
        return dto;
    }

    @Override
    protected void configure(ModelMapper mapper) {

        // Entity -> DTO (GET)
        mapper.createTypeMap(Exercise.class, ExerciseReadDTO.class)
                .setPostConverter(ctx -> {
                    Exercise entity = ctx.getSource();
                    ExerciseReadDTO dto = ctx.getDestination();

                    dto.setFavorited(entity.isFavorited());
                    dto.setMuscles(muscleMapper.toDTO(entity.getMuscles()));
                    dto.setTargetMuscles(
                            muscleMapper.toDTO(entity.getMusclesByRole(ExerciseMuscleMovementClassification.TARGET)));
                    dto.setSynergistMuscles(
                            muscleMapper.toDTO(entity.getMusclesByRole(ExerciseMuscleMovementClassification.SYNERGIST)));
                    dto.setStabilizerMuscles(
                            muscleMapper.toDTO(entity.getMusclesByRole(ExerciseMuscleMovementClassification.STABILIZER)));
                    dto.setRootMuscles(muscleService.findRootMuscleCodesOrderedByRelevance(entity.getMuscles()));

                    if (entity.getGroup() != null) {
                        dto.setGroupName(entity.getGroup().getName().getValue());
                    }

                    exerciseMediaRepository.findByOwnerIdAndRole(entity.getId(), ExerciseMediaRole.COVER)
                            .ifPresent(m -> dto.setCoverMedia(toMediaDTO(m)));
                    exerciseMediaRepository.findByOwnerIdAndRole(entity.getId(), ExerciseMediaRole.EXECUTION)
                            .ifPresent(m -> dto.setExecutionMedia(toMediaDTO(m)));

                    return dto;
                });

        // DTO -> Entity (POST/PUT)
        mapper.createTypeMap(ExerciseWriteDTO.class, Exercise.class)
                .addMappings(m -> m.skip(Exercise::setExerciseMuscles))
                .setPostConverter(ctx -> {
                    ExerciseWriteDTO dto = ctx.getSource();
                    Exercise entity = ctx.getDestination();

                    if (dto.getName() != null) {
                        entity.setName(new Text(dto.getName()));
                    }

                    if (dto.getExerciseMuscles() != null) {
                        entity.setExerciseMuscles(exerciseMuscleMapper.toEntity(dto.getExerciseMuscles()));
                    }

                    // Create exercise group, if it doesn't exist.
                    if (dto.getGroupName() != null) {
                        // Try to find group by name.
                        ExerciseGroup group = exerciseGroupRepository.findAll()
                                .stream()
                                .filter(g -> g.getName().getValue().equals(dto.getGroupName()))
                                .findFirst()
                                .orElse(null);

                        // If not found, create new group.
                        if (group == null) {
                            group = new ExerciseGroup();
                            group.setName(new Text(dto.getGroupName()));
                            group = exerciseGroupRepository.save(group);
                        }

                        entity.setGroup(group);
                    }

                    return entity;
                });

    }

}
