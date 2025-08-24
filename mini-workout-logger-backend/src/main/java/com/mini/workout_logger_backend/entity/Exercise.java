package com.mini.workout_logger_backend.entity;

import com.mini.java_core.entity.AbstractEntity;
import com.mini.workout_logger_backend.enums.ExerciseCategory;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Table(name = "exercises")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Exercise extends AbstractEntity {

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column(name = "category", nullable = false)
    @Enumerated(EnumType.STRING)
    private ExerciseCategory category;

    @ManyToMany
    @JoinTable(name = "exercise_muscle_groups",
               joinColumns = @JoinColumn(name = "exercise_id"),
               inverseJoinColumns = @JoinColumn(name = "muscle_group_id"))
    Set<MuscleGroup> muscleGroups;

    @OneToMany(mappedBy = "exercise",
               cascade = {CascadeType.MERGE},
               fetch = FetchType.LAZY)
    Set<ExerciseExecution> executions;

}
