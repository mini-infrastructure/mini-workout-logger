package com.mini.workout_logger_backend.entity;

import com.mini.java_core.entity.AbstractEntity;
import com.mini.workout_logger_backend.enums.ExerciseEquipment;
import com.mini.workout_logger_backend.enums.ExerciseExecutionType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "exercise_executions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseExecution extends AbstractEntity {

    @ManyToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "exercise_id", nullable = false)
    private Exercise exercise;

    @Column(name = "type", nullable = false)
    @Enumerated(EnumType.STRING)
    private ExerciseExecutionType type;

    @Column(name = "equipment", nullable = false)
    @Enumerated(EnumType.STRING)
    private ExerciseEquipment equipment;

    @Column(name = "repetitions")
    private Integer repetitions;

    @Column(name = "weight")
    private Double weight;

}
