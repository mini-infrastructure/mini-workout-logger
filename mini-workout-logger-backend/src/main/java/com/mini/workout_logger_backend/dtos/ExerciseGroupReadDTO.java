package com.mini.workout_logger_backend.dtos;

import com.mini.java_core.dto.ReadDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExerciseGroupReadDTO extends ReadDTO {

    private String name;

}
