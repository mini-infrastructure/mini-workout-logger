package com.mini.workout_logger_backend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.mini.java_core.converter.TextConverter;
import com.mini.java_core.entity.AbstractEntity;
import com.mini.java_core.entity.Text;
import com.mini.workout_logger_backend.enums.ExerciseCategory;
import com.mini.workout_logger_backend.enums.ExerciseDifficulty;
import com.mini.workout_logger_backend.enums.ExerciseEquipment;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "exercises", indexes = {
        @Index(name = "idx_exercises_name", columnList = "name"),
        @Index(name = "idx_exercises_category", columnList = "category"),
        @Index(name = "idx_exercises_difficulty", columnList = "difficulty")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Exercise extends AbstractEntity {

    @Column(name = "name", nullable = false, unique = true)
    @Convert(converter = TextConverter.class)
    private Text name;

    @Column(name = "category")
    @Enumerated(EnumType.STRING)
    private ExerciseCategory category;

    @Column(name = "difficulty")
    @Enumerated(EnumType.STRING)
    private ExerciseDifficulty difficulty;

    @JsonManagedReference
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "exercises_muscles",
               joinColumns = @JoinColumn(name = "exercise_id"),
               inverseJoinColumns = @JoinColumn(name = "muscle_id"))
    private Set<Muscle> muscles = new HashSet<>();

    @JsonBackReference
    @OneToMany(mappedBy = "exercise")
    @JsonIgnore
    private List<WorkoutExercise> workoutExercises = new ArrayList<>();

    @ElementCollection(targetClass = ExerciseEquipment.class, fetch = FetchType.LAZY)
    @CollectionTable(name = "exercise_equipment",
            joinColumns = @JoinColumn(name = "exercise_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "equipment")
    private Set<ExerciseEquipment> equipments = new HashSet<>();

    public void addMuscle(Muscle muscle) {
        this.muscles.add(muscle);
        muscle.getExercises().add(this);
    }

    public void removeMuscle(Muscle muscle) {
        this.muscles.remove(muscle);
        muscle.getExercises().remove(this);
    }

    public void setMuscles(Set<Muscle> muscles) {
        this.muscles.clear();
        if (muscles != null) {
            this.muscles.addAll(muscles);
        }
    }

    public void addWorkoutExercise(WorkoutExercise workoutExercise) {
        this.workoutExercises.add(workoutExercise);
        workoutExercise.setExercise(this);
    }

    public void removeWorkoutExercise(WorkoutExercise workoutExercise) {
        this.workoutExercises.remove(workoutExercise);
        workoutExercise.setExercise(null);
    }

    public void setWorkoutExercises(List<WorkoutExercise> workoutExercises) {
        this.workoutExercises.clear();
        if (workoutExercises != null) {
            workoutExercises.forEach(this::addWorkoutExercise);
        }
    }

    public void addEquipments(ExerciseEquipment equipment) {
        this.equipments.add(equipment);
    }

    public void removeEquipments(ExerciseEquipment equipment) {
        this.equipments.remove(equipment);
    }

    public void setEquipments(Set<ExerciseEquipment> equipment) {
        this.equipments.clear();
        if (equipment != null) {
            this.equipments.addAll(equipment);
        }
    }

}
