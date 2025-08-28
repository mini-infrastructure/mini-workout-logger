package com.mini.workout_logger_backend.entity;

import com.mini.java_core.entity.AbstractEntity;
import com.mini.workout_logger_backend.enums.ExerciseCategory;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "exercises")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Exercise extends AbstractEntity {

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column(name = "category")
    @Enumerated(EnumType.STRING)
    private ExerciseCategory category;

    @ManyToMany
    @JoinTable(name = "exercises_muscle_groups",
               joinColumns = @JoinColumn(name = "exercise_id"),
               inverseJoinColumns = @JoinColumn(name = "muscle_group_id"))
    Set<MuscleGroup> muscleGroups = new HashSet<>();

    public void addMuscleGroup(MuscleGroup muscleGroup) {
        this.muscleGroups.add(muscleGroup);
        muscleGroup.getExercises().add(this);
    }

    public void removeMuscleGroup(MuscleGroup muscleGroup) {
        this.muscleGroups.remove(muscleGroup);
        muscleGroup.getExercises().remove(this);
    }

    public void setMuscleGroups(Set<MuscleGroup> muscleGroups) {
        this.muscleGroups.clear();
        if (muscleGroups != null) {
            muscleGroups.forEach(this::addMuscleGroup);
        }
    }

}
