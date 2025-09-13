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
@Table(name = "muscles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Muscle extends AbstractEntity {

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @ManyToMany(mappedBy = "muscles")
    @JsonIgnore
    private Set<Exercise> exercises = new HashSet<>();

    public void addExercise(Exercise exercise) {
        this.exercises.add(exercise);
        exercise.getMuscles().add(this);
    }

    public void removeExercise(Exercise exercise) {
        this.exercises.remove(exercise);
        exercise.getMuscles().remove(this);
    }

    public void setExercises(Set<Exercise> exercises) {
        this.exercises.clear();
        if (exercises != null) {
            exercises.forEach(this::addExercise);
        }
    }

}
