package com.mini.workout_logger_backend.controllers;

import com.mini.java_core.controller.AbstractController;
import com.mini.workout_logger_backend.dtos.TagReadDTO;
import com.mini.workout_logger_backend.dtos.TagWriteDTO;
import com.mini.workout_logger_backend.entities.Tag;
import com.mini.workout_logger_backend.mappers.TagMapper;
import com.mini.workout_logger_backend.repositories.TagRepository;
import com.mini.workout_logger_backend.services.TagService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("tags")
@io.swagger.v3.oas.annotations.tags.Tag(name = "Tag", description = "Tag API")
public class TagController extends AbstractController<Tag,
                                                      TagReadDTO,
                                                      TagWriteDTO,
                                                      TagMapper,
                                                      TagRepository,
                                                      TagService> {

}
