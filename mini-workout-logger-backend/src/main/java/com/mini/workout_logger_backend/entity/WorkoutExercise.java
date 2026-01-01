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
@Table(name = "workout_exercises")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutExercise extends AbstractEntity {

    @JsonBackReference
    @ManyToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "workout_id", nullable = false)
    private Workout workout;

    @JsonManagedReference
    @ManyToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "exercise_id", nullable = false)
    private Exercise exercise;

    @JsonManagedReference
    @OneToMany(mappedBy = "workoutExecution",
            cascade = {CascadeType.ALL},
            orphanRemoval = true)
    @OrderColumn(name = "position")
    private List<Set> sets = new ArrayList<>();

    @Column(name = "equipment")
    @Enumerated(EnumType.STRING)
    private ExerciseEquipment equipment;

    @Column(name = "rest_time_seconds")
    private Integer restTimeSeconds;

    public int getPosition() {
        if (workout == null) return -1;
        return workout.getExercises().indexOf(this);
    }

    public void addSet(Set set) {
        this.sets.add(set);
        set.setWorkoutExercise(this);
    }

    public void removeSet(Set set) {
        this.sets.remove(set);
        set.setWorkoutExercise(null);
    }

    public void setSets(List<Set> sets) {
        this.sets.clear();
        if (sets != null) {
            sets.forEach(this::addSet);
        }
    }

    public void reorderSet(Set set, Integer newPosition) {
        if (sets.contains(set)) {
            sets.remove(set);
            sets.add(newPosition, set);
        }
    }

}
