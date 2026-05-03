package com.mini.workout_logger_backend.entities;

import com.mini.java_core.entity.Media;
import com.mini.workout_logger_backend.enums.ExerciseMediaRole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "exercise_media")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseMedia extends Media {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exercise_id", nullable = false)
    private Exercise owner;

    @Column(name = "role", nullable = false)
    @Enumerated(EnumType.STRING)
    private ExerciseMediaRole role = ExerciseMediaRole.COVER;

}
