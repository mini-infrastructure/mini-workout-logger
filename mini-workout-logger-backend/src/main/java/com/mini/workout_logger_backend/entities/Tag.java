package com.mini.workout_logger_backend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.mini.java_core.entity.AbstractEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "tags",
        indexes = {@Index(name = "idx_tags_name", columnList = "name")})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Tag extends AbstractEntity {

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @JsonBackReference
    @ManyToMany(mappedBy = "tags")
    private Set<Workout> workouts = new HashSet<>();

}
