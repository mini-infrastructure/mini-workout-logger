package com.mini.workout_logger_backend.entity;

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
@Table(name = "workout_exercise_executions", uniqueConstraints = {
        @UniqueConstraint(name = "uk_workout_exercise_execution_order", columnNames = {"workout_execution_id", "position"})
})
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

    @JsonManagedReference
    @OneToMany(mappedBy = "workoutExerciseExecution",
               cascade = {CascadeType.ALL},
               orphanRemoval = true)
    private List<SetExecution> setExecutions = new ArrayList<>();

    @Column(name = "position")
    private Integer position;

    @Override
    public boolean getCompleted() {
        return !setExecutions.isEmpty()
                && setExecutions.stream().allMatch(SetExecution::getCompleted);
    }

}
