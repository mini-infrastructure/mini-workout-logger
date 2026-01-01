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
@Table(name = "workout_executions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutExecution extends Execution {

    @JsonBackReference
    @ManyToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "workout_id", nullable = false)
    private Workout workout;

    @OneToMany(mappedBy = "workoutExecution",
               cascade = CascadeType.ALL,
               orphanRemoval = true)
    @OrderColumn(name = "position")
    private List<WorkoutExerciseExecution> exercises = new ArrayList<>();

}
