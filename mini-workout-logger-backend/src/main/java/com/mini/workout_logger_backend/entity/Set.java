package com.mini.workout_logger_backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.mini.java_core.entity.SimpleAbstractEntity;
import com.mini.workout_logger_backend.enums.SetCategory;
import com.mini.workout_logger_backend.enums.SetType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "sets", uniqueConstraints = {
        @UniqueConstraint(name = "uk_set_order", columnNames = {"workout_exercise_id", "position"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Set extends SimpleAbstractEntity {

    @EmbeddedId
    private SetId id;

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
    @JoinColumn(name = "workout_exercise_id", insertable = false, updatable = false)
    private WorkoutExercise workoutExercise;

}
