package com.mini.workout_logger_backend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.mini.java_core.converter.TextConverter;
import com.mini.java_core.entity.AbstractEntity;
import com.mini.java_core.entity.Text;
import com.mini.workout_logger_backend.enums.ExerciseMuscleMovementClassification;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "muscles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Muscle extends AbstractEntity {

    @Column(name = "name", nullable = false, unique = true)
    @Convert(converter = TextConverter.class)
    private Text name;

    @JsonBackReference
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "muscle_groups",
               joinColumns = @JoinColumn(name = "muscle_id"),
               inverseJoinColumns = @JoinColumn(name = "muscle_group_id"))
    private Set<Muscle> muscleGroups = new HashSet<>();

    @JsonManagedReference
    @ManyToMany(mappedBy = "muscleGroups")
    private Set<Muscle> muscles = new HashSet<>();

    @JsonBackReference("exercisemuscle-muscle")
    @OneToMany(mappedBy = "muscle")
    private Set<ExerciseMuscle> exerciseMuscles = new HashSet<>();

    public void addMuscleGroup(Muscle muscle) {
        this.muscleGroups.add(muscle);
        muscle.getMuscles().add(this);
    }

    public void removeMuscleGroup(Muscle muscle) {
        this.muscleGroups.remove(muscle);
        muscle.getMuscles().remove(this);
    }

    public void setMuscleGroups(Set<Muscle> muscleGroups) {
        for (Muscle group : new HashSet<>(this.muscleGroups)) {
            removeMuscleGroup(group);
        }
        if (muscleGroups != null) {
            muscleGroups.forEach(this::addMuscleGroup);
        }
    }

}
