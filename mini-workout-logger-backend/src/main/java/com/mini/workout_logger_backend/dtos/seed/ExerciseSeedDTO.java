package com.mini.workout_logger_backend.dtos.seed;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

/**
 * DTO for seeding exercises from JSON.
 * Muscles are organized by their movement classification role.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseSeedDTO {

    private String name;
    private String group;
    private String category;
    private String difficulty;
    private String equipment;
    private String force;
    private String mechanics;
    private String role;
    private String type;
    private boolean hidden = false;

    private List<String> targetMuscles = new ArrayList<>();
    private List<String> agonistMuscles = new ArrayList<>();
    private List<String> synergistMuscles = new ArrayList<>();
    private List<String> stabilizerMuscles = new ArrayList<>();
    private List<String> dynamicStabilizerMuscles = new ArrayList<>();
    private List<String> antagonistMuscles = new ArrayList<>();
    private List<String> antagonistStabilizerMuscles = new ArrayList<>();

}
