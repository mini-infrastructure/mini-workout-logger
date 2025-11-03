package com.mini.workout_logger_backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.mini.java_core.entity.AbstractEntity;
import com.mini.workout_logger_backend.enums.ExerciseEquipment;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "exercise_executions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseExecution extends AbstractEntity {

    @JsonManagedReference
    @ManyToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "exercise_id", nullable = false)
    private Exercise exercise;

    @JsonManagedReference
    @OneToMany(mappedBy = "exerciseExecution",
               cascade = {CascadeType.MERGE},
               orphanRemoval = true,
               fetch = FetchType.LAZY)
    @OrderColumn(name = "position")
    private List<Set> sets = new ArrayList<>();

    @Column(name = "equipment")
    @Enumerated(EnumType.STRING)
    private ExerciseEquipment equipment;

    @Column(name = "rest_time_seconds")
    private Integer restTimeSeconds;

}
