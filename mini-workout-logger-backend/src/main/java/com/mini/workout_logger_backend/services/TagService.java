package com.mini.workout_logger_backend.services;

import com.mini.java_core.service.AbstractService;
import com.mini.workout_logger_backend.dtos.TagReadDTO;
import com.mini.workout_logger_backend.dtos.TagWriteDTO;
import com.mini.workout_logger_backend.entities.Tag;
import com.mini.workout_logger_backend.mappers.TagMapper;
import com.mini.workout_logger_backend.repositories.TagRepository;
import org.springframework.stereotype.Service;

@Service
public class TagService extends AbstractService<Tag, TagReadDTO, TagWriteDTO, TagMapper, TagRepository> {

}
