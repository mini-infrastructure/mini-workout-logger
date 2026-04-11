package com.mini.workout_logger_backend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.mini.java_core.converter.TextConverter;
import com.mini.java_core.entity.AbstractEntity;
import com.mini.java_core.entity.Text;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;
import java.util.HashSet;

@Entity
@Table(name = "exercise_groups", indexes = {
        @Index(name = "idx_exercise_groups_name", columnList = "name")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseGroup extends AbstractEntity {

    @Column(name = "name", nullable = false, unique = true)
    @Convert(converter = TextConverter.class)
    private Text name;

    @JsonBackReference
    @OneToMany(mappedBy = "group")
    private Set<Exercise> exercises = new HashSet<>();

}
