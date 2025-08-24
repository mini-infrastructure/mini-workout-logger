package com.mini.workout_logger_backend.entity;

import com.mini.java_core.entity.AbstractEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Table(name = "muscle_groups")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MuscleGroup extends AbstractEntity {

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @ManyToMany
    @JoinTable(name = "exercise_muscle_groups",
               joinColumns = @JoinColumn(name = "muscle_group_id"),
               inverseJoinColumns = @JoinColumn(name = "exercise_id"))
    private Set<Exercise> exercises;

}
