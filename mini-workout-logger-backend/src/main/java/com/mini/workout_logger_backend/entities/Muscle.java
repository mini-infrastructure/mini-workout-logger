package com.mini.workout_logger_backend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.mini.java_core.converter.TextConverter;
import com.mini.java_core.entity.AbstractEntity;
import com.mini.java_core.entity.Text;
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
    @Convert(converter = TextConverter.class)
    private Text name;

    @JsonBackReference
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "muscle_groups",
               joinColumns = @JoinColumn(name = "muscle_id"),
               inverseJoinColumns = @JoinColumn(name = "muscle_group_id"))
    private Set<Muscle> muscleGroups = new HashSet<>();

    @JsonManagedReference
    @ManyToMany(mappedBy = "muscleGroups")
    private Set<Muscle> muscles = new HashSet<>();

    @JsonBackReference
    @ManyToMany(mappedBy = "muscles")
    private Set<Exercise> exercises = new HashSet<>();

    public void addMuscleGroup(Muscle muscle) {
        this.muscleGroups.add(muscle);
        muscle.getMuscles().add(this);
    }

    public void removeMuscleGroup(Muscle muscle) {
        this.muscleGroups.remove(muscle);
        muscle.getMuscles().remove(this);
    }

    public void setMuscleGroups(Set<Muscle> muscleGroups) {
        this.muscleGroups.clear();
        if (muscleGroups != null) {
            this.muscleGroups.addAll(muscleGroups);
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
            this.exercises.addAll(exercises);
        }
    }

}
