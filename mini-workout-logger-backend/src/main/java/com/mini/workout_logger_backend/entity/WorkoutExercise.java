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
@Table(name = "workout_exercises",
        // uniqueConstraints = {@UniqueConstraint(name = "uk_workout_exercises_order", columnNames = {"workout_id", "position"})},
        indexes = {
                @Index(name = "idx_workout_exercises_workout_id", columnList = "workout_id"),
                @Index(name = "idx_workout_exercises_exercise_id", columnList = "exercise_id")})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutExercise extends AbstractEntity {

    @JsonBackReference
    @ManyToOne(optional = false)
    @JoinColumn(name = "workout_id", nullable = false)
    private Workout workout;

    @Column(name = "position")
    private Integer position;

    @JsonManagedReference
    @ManyToOne(optional = false)
    @JoinColumn(name = "exercise_id", nullable = false)
    private Exercise exercise;

    @JsonManagedReference
    @OneToMany(mappedBy = "workoutExercise",
            cascade = {CascadeType.ALL},
            orphanRemoval = true)
    @OrderColumn(name = "position")
    private List<Set> sets = new ArrayList<>();

    @Column(name = "equipment")
    @Enumerated(EnumType.STRING)
    private ExerciseEquipment equipment;

    @Column(name = "rest_time_seconds")
    private Integer restTimeSeconds;

    @JsonBackReference
    @OneToMany(mappedBy = "workoutExercise",
            cascade = CascadeType.ALL)
    private List<WorkoutExerciseExecution> executions = new ArrayList<>();

    public int getPosition() {
        if (workout == null) return -1;
        return workout.getWorkoutExercises().indexOf(this);
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