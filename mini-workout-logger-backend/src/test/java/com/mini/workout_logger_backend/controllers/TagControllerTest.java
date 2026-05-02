package com.mini.workout_logger_backend.controllers;

import com.mini.java_core.AbstractCrudControllerTest;
import com.mini.workout_logger_backend.dtos.TagReadDTO;
import com.mini.workout_logger_backend.dtos.TagWriteDTO;
import com.mini.workout_logger_backend.entities.Tag;
import com.mini.workout_logger_backend.mappers.TagMapper;
import com.mini.workout_logger_backend.repositories.TagRepository;

import java.util.List;

public class TagControllerTest extends AbstractCrudControllerTest<Tag,
                                                                   TagReadDTO,
                                                                   TagWriteDTO,
                                                                   TagMapper,
                                                                   TagRepository> {

    @Override
    protected String getBaseUrl() {
        return "/tags";
    }

    @Override
    protected List<TagWriteDTO> getWriteDtos() {
        return List.of(
                new TagWriteDTO("Push Day"),
                new TagWriteDTO("Pull Day"),
                new TagWriteDTO("Legs")
        );
    }

}
