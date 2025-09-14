package com.mini.workout_logger_backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
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

    @JsonBackReference
    @ManyToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "muscle_group_id")
    private Muscle muscleGroup;

    @OneToMany(mappedBy = "muscleGroup",
               cascade = {CascadeType.MERGE},
               fetch = FetchType.LAZY)
    Set<Muscle> muscles = new HashSet<>();

    @ManyToMany(mappedBy = "muscles")
    @JsonIgnore
    private Set<Exercise> exercises = new HashSet<>();

    public void addMuscle(Muscle muscle) {
        this.muscles.add(muscle);
        muscle.setMuscleGroup(this);
    }

    public void removeMuscle(Muscle muscle) {
        this.muscles.remove(muscle);
        muscle.setMuscleGroup(null);
    }

    public void setMuscles(Set<Muscle> muscles) {
        this.muscles.clear();
        if (muscles != null) {
            muscles.forEach(this::addMuscle);
        }
    }

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
