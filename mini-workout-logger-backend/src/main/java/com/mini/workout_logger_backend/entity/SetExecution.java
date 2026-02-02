package com.mini.workout_logger_backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "set_executions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SetExecution extends Execution {

    @JsonBackReference
    @ManyToOne(optional = false)
    @JoinColumn(name = "workout_exercise_execution_id", nullable = false)
    private WorkoutExerciseExecution workoutExerciseExecution;

    @JsonManagedReference
    @ManyToOne(optional = false)
    @JoinColumn(name = "set_id", nullable = false)
    private Set set;

    @Column(name = "actual_repetitions")
    private Integer actualRepetitions;

    @Column(name = "actual_weight")
    private Double actualWeight;

    @Column(name = "actual_duration_seconds")
    private Integer actualDurationSeconds;

    @Column(name = "completed", nullable = false)
    private Boolean completed;

    @Override
    public boolean getCompleted() {
        return this.completed;
    }

}
