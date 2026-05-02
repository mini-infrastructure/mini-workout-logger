package com.mini.workout_logger_backend.mappers;

import com.mini.java_core.mapper.AbstractMapper;
import com.mini.workout_logger_backend.dtos.TagReadDTO;
import com.mini.workout_logger_backend.dtos.TagWriteDTO;
import com.mini.workout_logger_backend.entities.Tag;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class TagMapper extends AbstractMapper<Tag, TagReadDTO, TagWriteDTO> {

    @Override
    protected void configure(ModelMapper mapper) {

        // Entity -> DTO (GET)
        mapper.createTypeMap(Tag.class, TagReadDTO.class);

        // DTO -> Entity (POST/PUT)
        mapper.createTypeMap(TagWriteDTO.class, Tag.class)
                .setPostConverter(ctx -> {
                    TagWriteDTO dto = ctx.getSource();
                    Tag entity = ctx.getDestination();

                    if (dto.getName() != null) {
                        entity.setName(dto.getName());
                    }

                    return entity;
                });
    }

}
