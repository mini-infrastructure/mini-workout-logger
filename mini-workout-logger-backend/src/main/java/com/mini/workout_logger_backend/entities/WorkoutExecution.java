package com.mini.workout_logger_backend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "workout_executions", indexes = {
        @Index(name = "idx_workout_executions_workout", columnList = "workout_id")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutExecution extends Execution {

    @JsonBackReference
    @ManyToOne(optional = false)
    @JoinColumn(name = "workout_id", nullable = false)
    private Workout workout;

    @JsonManagedReference
    @OneToMany(mappedBy = "workoutExecution",
               cascade = CascadeType.ALL,
               orphanRemoval = true)
    private List<WorkoutExerciseExecution> workoutExerciseExecutions = new ArrayList<>();

    @Override
    public boolean getCompleted() {
        return !workoutExerciseExecutions.isEmpty()
                && workoutExerciseExecutions.stream().allMatch(WorkoutExerciseExecution::getCompleted);
    }

    public void addWorkoutExerciseExecution(WorkoutExerciseExecution execution) {
        workoutExerciseExecutions.add(execution);
        execution.setWorkoutExecution(this);
    }

}
