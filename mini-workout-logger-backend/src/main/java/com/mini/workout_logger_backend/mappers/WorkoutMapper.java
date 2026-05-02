package com.mini.workout_logger_backend.mappers;

import com.mini.java_core.entity.Text;
import com.mini.java_core.mapper.AbstractMapper;
import com.mini.workout_logger_backend.dtos.TagReadDTO;
import com.mini.workout_logger_backend.dtos.WorkoutReadDTO;
import com.mini.workout_logger_backend.dtos.WorkoutWriteDTO;
import com.mini.workout_logger_backend.entities.Tag;
import com.mini.workout_logger_backend.entities.Workout;
import com.mini.workout_logger_backend.repositories.TagRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.List;

@Component
public class WorkoutMapper extends AbstractMapper<Workout, WorkoutReadDTO, WorkoutWriteDTO> {

    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private TagMapper tagMapper;

    @Autowired
    private WorkoutExerciseMapper workoutExerciseMapper;

    @Override
    protected void configure(ModelMapper mapper) {

        // Entity -> DTO (GET)
        mapper.createTypeMap(Workout.class, WorkoutReadDTO.class)
                .setPostConverter(ctx -> {
                    Workout src = ctx.getSource();
                    WorkoutReadDTO dest = ctx.getDestination();
                    if (src.getTags() != null) {
                        List<TagReadDTO> tagDtos = src.getTags().stream()
                                .map(tagMapper::toDTO)
                                .toList();
                        dest.setTags(tagDtos);
                    }
                    if (src.getWorkoutExercises() != null) {
                        dest.setWorkoutExercises(workoutExerciseMapper.toDTO(src.getWorkoutExercises()));
                    }
                    return dest;
                });

        // DTO -> Entity (POST/PUT)
        mapper.createTypeMap(WorkoutWriteDTO.class, Workout.class)
                .setPostConverter(ctx -> {
                    WorkoutWriteDTO dto = ctx.getSource();
                    Workout entity = ctx.getDestination();

                    if (dto.getName() != null) {
                        entity.setName(new Text(dto.getName()));
                    }

                    if (dto.getTagIds() != null) {
                        entity.setTags(tagRepository.safeFindByIds(dto.getTagIds(), HashSet::new));
                    }

                    return entity;
                });
    }

}
