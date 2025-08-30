package com.mini.workout_logger_backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mini.java_core.entity.AbstractEntity;
import com.mini.workout_logger_backend.enums.ExerciseCategory;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
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

    @OneToMany(mappedBy = "exercise",
               cascade = {CascadeType.MERGE},
               fetch = FetchType.LAZY)
    @JsonIgnore
    private List<ExerciseExecution> executions = new ArrayList<>();

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

    public void addExecution(ExerciseExecution execution) {
        this.executions.add(execution);
        execution.setExercise(this);
    }

    public void removeExecution(ExerciseExecution execution) {
        this.executions.remove(execution);
        execution.setExercise(null);
    }

    public void setExecutions(List<ExerciseExecution> executions) {
        this.executions.clear();
        if (executions != null) {
            executions.forEach(this::addExecution);
        }
    }

}
