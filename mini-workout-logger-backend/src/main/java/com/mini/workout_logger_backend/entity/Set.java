package com.mini.workout_logger_backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.mini.java_core.entity.AbstractEntity;
import com.mini.workout_logger_backend.enums.SetCategory;
import com.mini.workout_logger_backend.enums.SetType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "sets")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Set extends AbstractEntity {

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

    @JsonBackReference
    @ManyToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "exercise_execution_id", nullable = false)
    private ExerciseExecution exerciseExecution;

}
