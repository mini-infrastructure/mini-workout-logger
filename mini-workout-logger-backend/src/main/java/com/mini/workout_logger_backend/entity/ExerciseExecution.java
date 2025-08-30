package com.mini.workout_logger_backend.entity;

import com.mini.java_core.entity.AbstractEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Duration;

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

    @Column(name = "repetitions")
    private Integer repetitions;

    @Column(name = "weight")
    private Double weight;

    @Column(name = "duration")
    private Duration duration;

}
