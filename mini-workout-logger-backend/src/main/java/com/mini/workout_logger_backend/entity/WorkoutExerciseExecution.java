package com.mini.workout_logger_backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "workout_exercise_executions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutExerciseExecution extends Execution {

    @JsonBackReference
    @ManyToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "workout_execution_id", nullable = false)
    private WorkoutExecution workoutExecution;

    @JsonBackReference
    @ManyToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "workout_exercise_id", nullable = false)
    private WorkoutExercise workoutExercise;

    @OneToMany(mappedBy = "workoutExerciseExecution",
               cascade = {CascadeType.ALL},
               orphanRemoval = true)
    private List<SetExecution> sets = new ArrayList<>();

    @Override
    public boolean getCompleted() {
        return !sets.isEmpty()
                && sets.stream().allMatch(SetExecution::getCompleted);
    }

}
