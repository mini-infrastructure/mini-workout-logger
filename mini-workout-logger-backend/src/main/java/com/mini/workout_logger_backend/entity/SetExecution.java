package com.mini.workout_logger_backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "set_executions", uniqueConstraints = {
        @UniqueConstraint(name = "uk_set_execution_order",columnNames = {"workout_exercise_execution_id", "position"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SetExecution extends Execution {

    @JsonBackReference
    @ManyToOne(optional = false, cascade = {CascadeType.MERGE})
    @JoinColumn(name = "workout_exercise_execution_id", nullable = false)
    private WorkoutExerciseExecution workoutExerciseExecution;

    @JsonBackReference
    @ManyToOne(optional = false)
    @JoinColumns({
            @JoinColumn(name = "set_id", referencedColumnName = "id"),
            @JoinColumn(name = "workout_exercise_id", referencedColumnName = "workout_exercise_id")})
    private Set set;

    @Column(name = "actual_repetitions")
    private Integer actualRepetitions;

    @Column(name = "actual_weight")
    private Double actualWeight;

    @Column(name = "actual_duration_seconds")
    private Integer actualDurationSeconds;

    @Column(name = "position")
    private Integer position;

}
