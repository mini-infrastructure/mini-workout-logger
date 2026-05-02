package com.mini.workout_logger_backend.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.mini.java_core.converter.TextConverter;
import com.mini.java_core.entity.AbstractEntity;
import com.mini.java_core.entity.Text;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;

@Entity
@Table(name = "workouts",
        indexes = {@Index(name = "idx_workouts_name", columnList = "name")})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Workout extends AbstractEntity {

    @Column(name = "name", nullable = false, unique = true)
    @Convert(converter = TextConverter.class)
    private Text name;

    @JsonManagedReference
    @OneToMany(mappedBy = "workout",
            cascade = {CascadeType.ALL},
            orphanRemoval = true)
    @OrderColumn(name = "position")
    private List<WorkoutExercise> workoutExercises = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "workout",
            cascade = {CascadeType.ALL},
            orphanRemoval = true)
    private List<WorkoutExecution> workoutExecutions = new ArrayList<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "workout_tags",
            joinColumns = @JoinColumn(name = "workout_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private Set<Tag> tags = new HashSet<>();

    public void addTag(Tag tag) {
        this.tags.add(tag);
        tag.getWorkouts().add(this);
    }

    public void removeTag(Tag tag) {
        this.tags.remove(tag);
        tag.getWorkouts().remove(this);
    }

    public void setTags(Set<Tag> tags) {
        this.tags.clear();
        if (tags != null) {
            tags.forEach(this::addTag);
        }
    }

    public void addWorkoutExercise(WorkoutExercise workoutExercise) {
        this.workoutExercises.add(workoutExercise);
        workoutExercise.setWorkout(this);
    }

    public void removeWorkoutExercise(WorkoutExercise workoutExercise) {
        this.workoutExercises.remove(workoutExercise);
        workoutExercise.setWorkout(null);
    }

    public void setWorkoutExercises(List<WorkoutExercise> workoutExercises) {
        this.workoutExercises.clear();
        if (workoutExercises != null) {
            workoutExercises.forEach(this::addWorkoutExercise);
        }
    }

    public void reorderWorkoutExercise(WorkoutExercise workoutExercise,
                                       Integer newPosition) {
        if (this.workoutExercises.remove(workoutExercise)) {
            this.workoutExercises.add(newPosition, workoutExercise);
        }
    }

    public void addWorkoutExecution(WorkoutExecution workoutExecution) {
        this.workoutExecutions.add(workoutExecution);
        workoutExecution.setWorkout(this);
    }

    public void removeWorkoutExecution(WorkoutExecution workoutExecution) {
        this.workoutExecutions.remove(workoutExecution);
        workoutExecution.setWorkout(null);
    }

    public void setWorkoutExecutions(List<WorkoutExecution> workoutExecutions) {
        this.workoutExecutions.clear();
        if (workoutExecutions != null) {
            workoutExecutions.forEach(this::addWorkoutExecution);
        }
    }

}
