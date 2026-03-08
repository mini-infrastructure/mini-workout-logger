package com.mini.workout_logger_backend.dtos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mini.java_core.dto.ReadDTO;
import com.mini.workout_logger_backend.enums.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

// TODO: Criar parâmetro que indica possíveis substituições para o exercício baseado nos mesmos músculos envolvidos,
//       e talvez baseado em exercícios relacionados também
@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExerciseReadDTO extends ReadDTO {

    private String name;

    private ExerciseCategory category;

    private ExerciseDifficulty difficulty;

    private ExerciseEquipment equipment;

    private ExerciseForceDirection force;

    private ExerciseMechanics mechanics;

    @JsonIgnore
    private Set<ExerciseMuscleReadDTO> exerciseMuscles = new HashSet<>();

    private Set<MuscleReadDTO> muscles = new HashSet<>();

    private Set<MuscleReadDTO> targetMuscles = new HashSet<>();

    private Set<MuscleReadDTO> synergistMuscles = new HashSet<>();

    private Set<MuscleReadDTO> stabilizerMuscles = new HashSet<>();

    private Set<String> rootMuscles = new HashSet<>();

    public ExerciseReadDTO(String name) {
        this.name = name;
    }

}
