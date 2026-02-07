package com.mini.workout_logger_backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.mini.java_core.entity.AbstractEntity;
import com.mini.workout_logger_backend.enums.SetCategory;
import com.mini.workout_logger_backend.enums.SetType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "sets",
        // uniqueConstraints = {@UniqueConstraint(name = "uk_sets_order", columnNames = {"workout_exercise_id", "position"})},
        indexes = {@Index(name = "idx_sets_workout_exercise", columnList = "workout_exercise_id")})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Set extends AbstractEntity {

    @JsonBackReference
    @ManyToOne(optional = false)
    @JoinColumn(name = "workout_exercise_id", nullable = false)
    private WorkoutExercise workoutExercise;

    @Column(name = "position")
    private Integer position;

    @JsonBackReference
    @OneToMany(mappedBy = "set",
            cascade = {CascadeType.ALL},
            orphanRemoval = true)
    private List<SetExecution> setExecutions;

    @Column(name = "category", nullable = false)
    @Enumerated(EnumType.STRING)
    private SetCategory category;

    @Column(name = "type", nullable = false)
    @Enumerated(EnumType.STRING)
    private SetType type;

    @Column(name = "repetitions")
    private Integer repetitions;

    @Column(name = "weight")
    private Double weight;

    @Column(name = "duration_seconds")
    private Integer durationSeconds;

    public int getPosition() {
        if (workoutExercise == null) return -1;
        return workoutExercise.getSets().indexOf(this);
    }

}