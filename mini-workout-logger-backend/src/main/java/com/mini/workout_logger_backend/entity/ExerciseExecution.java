package com.mini.workout_logger_backend.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.mini.java_core.entity.AbstractEntity;
import com.mini.workout_logger_backend.enums.ExerciseEquipment;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "exercise_executions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseExecution extends AbstractEntity {

    @JsonManagedReference
    @ManyToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "exercise_id", nullable = false)
    private Exercise exercise;

    @JsonManagedReference
    @OneToMany(mappedBy = "exerciseExecution",
            cascade = {CascadeType.ALL},
            orphanRemoval = true)
    @OrderColumn(name = "position")
    private List<Set> sets = new ArrayList<>();

    @Column(name = "equipment")
    @Enumerated(EnumType.STRING)
    private ExerciseEquipment equipment;

    @Column(name = "rest_time_seconds")
    private Integer restTimeSeconds;

    public void addSet(Set set) {
        this.sets.add(set);
        set.setExerciseExecution(this);
    }

    public void removeSet(Set set) {
        this.sets.remove(set);
        set.setExerciseExecution(null);
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

    /**
     * Sets the updatedAt timestamp to the current date and time, to mark
     * execution as completed.
     */
    public void setUpdatedAtToNow() {
        this.setUpdatedAt(new Date());
    }

    /**
     * The start time of the exercise execution, which is the createdAt timestamp.
     * @return Date representing the start time.
     */
    public Date getStartTime() {
        return this.getCreatedAt();
    }

    /**
     * If the exercise execution has been updated after creation, return the updatedAt
     * timestamp as the end time.
     * @return Date representing the end time, or null if not updated.
     */
    public Date getEndTime() {
        if (this.getUpdatedAt() == null || !this.getUpdatedAt().after(this.getCreatedAt())) {
            return null;
        }
        return this.getUpdatedAt();
    }

    /**
     * Determine if the exercise execution is completed based on the presence of an end time.
     * @return true if completed, false otherwise.
     */
    public boolean getCompleted() {
        return getEndTime() != null;
    }

}
