package com.mini.workout_logger_backend.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.mini.java_core.converter.TextConverter;
import com.mini.java_core.entity.AbstractEntity;
import com.mini.java_core.entity.Text;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "workouts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Workout extends AbstractEntity {

    @Column(name = "name", nullable = false, unique = true)
    @Convert(converter = TextConverter.class)
    private Text name;

    @JsonManagedReference
    @OneToMany(mappedBy = "workout",
            cascade = {CascadeType.ALL},
            orphanRemoval = true)
    @OrderColumn(name = "position")
    private List<WorkoutExercise> exercises = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "workout",
            cascade = {CascadeType.ALL},
            orphanRemoval = true)
    private List<WorkoutExecution> executions = new ArrayList<>();

    public void addExercise(WorkoutExercise exercise) {
        this.exercises.add(exercise);
        exercise.setWorkout(this);
    }

    public void removeExercise(WorkoutExercise exercise) {
        this.exercises.remove(exercise);
        exercise.setWorkout(null);
    }

    public void setExercises(List<WorkoutExercise> exercises) {
        this.exercises.clear();
        if (exercises != null) {
            exercises.forEach(this::addExercise);
        }
    }

    public void reorderExercise(WorkoutExercise exercise, Integer newPosition) {
        if (this.exercises.remove(exercise)) {
            this.exercises.add(newPosition, exercise);
        }
    }

    public void addExecution(WorkoutExecution execution) {
        this.executions.add(execution);
        execution.setWorkout(this);
    }

    public void removeExecution(WorkoutExecution execution) {
        this.executions.remove(execution);
        execution.setWorkout(null);
    }

    public void setExecutions(List<WorkoutExecution> executions) {
        this.executions.clear();
        if (executions != null) {
            executions.forEach(this::addExecution);
        }
    }

}
