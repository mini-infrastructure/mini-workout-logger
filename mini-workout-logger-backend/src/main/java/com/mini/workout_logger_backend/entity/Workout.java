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
    private List<WorkoutExercise> workoutExercises = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "workout",
            cascade = {CascadeType.ALL},
            orphanRemoval = true)
    private List<WorkoutExecution> workoutExecutions = new ArrayList<>();

    public void addWorkoutExercise(WorkoutExercise workoutExercise) {
        this.workoutExercises.add(workoutExercise);
        workoutExercise.setWorkout(this);
    }

    public void removeWorkoutExercise(WorkoutExercise workoutExercise) {
        this.workoutExercises.remove(workoutExercise);
        workoutExercise.setWorkout(null);
    }

    public void setWorkoutExercises(List<WorkoutExercise> workoutExercises) {
        this.workoutExercises.clear();
        if (workoutExercises != null) {
            workoutExercises.forEach(this::addWorkoutExercise);
        }
    }

    public void reorderWorkoutExercise(WorkoutExercise workoutExercise,
                                       Integer newPosition) {
        if (this.workoutExercises.remove(workoutExercise)) {
            this.workoutExercises.add(newPosition, workoutExercise);
        }
    }

    public void addWorkoutExecution(WorkoutExecution workoutExecution) {
        this.workoutExecutions.add(workoutExecution);
        workoutExecution.setWorkout(this);
    }

    public void removeWorkoutExecution(WorkoutExecution workoutExecution) {
        this.workoutExecutions.remove(workoutExecution);
        workoutExecution.setWorkout(null);
    }

    public void setWorkoutExecutions(List<WorkoutExecution> workoutExecutions) {
        this.workoutExecutions.clear();
        if (workoutExecutions != null) {
            workoutExecutions.forEach(this::addWorkoutExecution);
        }
    }

}
