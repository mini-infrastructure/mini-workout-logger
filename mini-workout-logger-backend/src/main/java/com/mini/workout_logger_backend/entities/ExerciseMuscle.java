package com.mini.workout_logger_backend.entities;

import com.mini.java_core.entity.AbstractEntity;
import com.mini.workout_logger_backend.enums.ExerciseMuscleMovementClassification;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "exercise_muscles",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_exercise_muscle",
                        columnNames = {"exercise_id", "muscle_id"}
                )
        },
        indexes = {
                @Index(name = "idx_exercise_muscle_exercise", columnList = "exercise_id"),
                @Index(name = "idx_exercise_muscle_muscle", columnList = "muscle_id"),
                @Index(name = "idx_exercise_muscle_role", columnList = "role")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseMuscle extends AbstractEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exercise_id", nullable = false)
    private Exercise exercise;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "muscle_id", nullable = false)
    private Muscle muscle;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private ExerciseMuscleMovementClassification role;

}
