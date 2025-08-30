package com.mini.workout_logger_backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mini.java_core.entity.AbstractEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "muscle_groups")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MuscleGroup extends AbstractEntity {

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @ManyToMany(mappedBy = "muscleGroups")
    @JsonIgnore
    private Set<Exercise> exercises = new HashSet<>();

    public void addExercise(Exercise exercise) {
        this.exercises.add(exercise);
        exercise.getMuscleGroups().add(this);
    }

    public void removeExercise(Exercise exercise) {
        this.exercises.remove(exercise);
        exercise.getMuscleGroups().remove(this);
    }

    public void setExercises(Set<Exercise> exercises) {
        this.exercises.clear();
        if (exercises != null) {
            exercises.forEach(this::addExercise);
        }
    }

}
