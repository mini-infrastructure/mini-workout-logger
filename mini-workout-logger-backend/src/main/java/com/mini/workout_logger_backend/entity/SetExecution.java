package com.mini.workout_logger_backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
    @ManyToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "workout_exercise_execution_id", nullable = false)
    private WorkoutExerciseExecution exerciseExecution;

    @JsonBackReference
    @ManyToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "set_id", nullable = false)
    private Set set;

}
