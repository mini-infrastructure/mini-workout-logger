package com.mini.workout_logger_backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mini.java_core.dto.WriteDTO;
import com.mini.java_core.validation.group.RestMethod;
import jakarta.validation.constraints.NotNull;
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
public class MuscleWriteDTO extends WriteDTO {

    @NotNull
    private String name;

    @JsonProperty(value = "muscle_group_ids")
    private Set<Long> muscleGroupIds = new HashSet<>();

    public MuscleWriteDTO(String name) {
        this.name = name;
    }

}
