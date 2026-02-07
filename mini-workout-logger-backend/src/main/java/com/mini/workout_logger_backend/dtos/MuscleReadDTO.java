package com.mini.workout_logger_backend.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mini.java_core.dto.ReadDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MuscleReadDTO extends ReadDTO {

    private String name;

    @JsonProperty("muscle_groups")
    private Set<MuscleReadDTO> muscleGroups = new HashSet<>();

    public MuscleReadDTO(String name) {
        this.name = name;
    }

}
