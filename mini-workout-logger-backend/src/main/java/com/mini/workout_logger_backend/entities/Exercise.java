package com.mini.workout_logger_backend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.mini.java_core.converter.TextConverter;
import com.mini.java_core.entity.AbstractEntity;
import com.mini.java_core.entity.Text;
import com.mini.workout_logger_backend.enums.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

// TODO: Auto relacionamento para registrar exercícios relacionados, que possuem uma pequena variação entre si;
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

    @Column(name = "favorited", nullable = false)
    private boolean favorited = false;

    @Column(name = "hidden", nullable = false)
    private boolean hidden = false;

    @Column(name = "category")
    @Enumerated(EnumType.STRING)
    private ExerciseCategory category;

    @Column(name = "difficulty")
    @Enumerated(EnumType.STRING)
    private ExerciseDifficulty difficulty;

    @JsonManagedReference("exercise-exercisemuscle")
    @OneToMany(mappedBy = "exercise",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private Set<ExerciseMuscle> exerciseMuscles = new HashSet<>();

    @JsonBackReference
    @OneToMany(mappedBy = "exercise")
    @JsonIgnore
    private List<WorkoutExercise> workoutExercises = new ArrayList<>();

    @Column(name = "equipment")
    @Enumerated(EnumType.STRING)
    private ExerciseEquipment equipment;

    @Column(name = "force")
    @Enumerated(EnumType.STRING)
    private ExerciseForceDirection force;

    @Column(name = "mechanics")
    @Enumerated(EnumType.STRING)
    private ExerciseMechanics mechanics;

    @JsonManagedReference("exercise-group")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id")
    private ExerciseGroup group;

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private ExerciseRole role;

    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private ExerciseType type;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ExerciseMedia> media = new ArrayList<>();

    public Set<Muscle> getMuscles() {
        return exerciseMuscles
                .stream()
                .map(ExerciseMuscle::getMuscle)
                .collect(Collectors.toSet());
    }

    public Set<Muscle> getMusclesByRole(ExerciseMuscleMovementClassification role) {
        return exerciseMuscles
                .stream()
                .filter(em -> em.getRole() == role)
                .map(ExerciseMuscle::getMuscle)
                .collect(Collectors.toSet());
    }

    public ExerciseMuscleMovementClassification roleOf(Muscle muscle) {
        return exerciseMuscles.stream()
                .filter(em -> em.getMuscle().equals(muscle))
                .map(ExerciseMuscle::getRole)
                .findFirst()
                .orElse(null);
    }

    public void addMuscle(Muscle muscle, ExerciseMuscleMovementClassification role) {
        ExerciseMuscle em = new ExerciseMuscle();
        em.setExercise(this);
        em.setMuscle(muscle);
        em.setRole(role);

        this.exerciseMuscles.add(em);
    }

    public void addExerciseMuscle(ExerciseMuscle exerciseMuscle) {
        if (exerciseMuscle.getMuscle() == null) {
            throw new IllegalArgumentException("ExerciseMuscle must have a muscle assigned before being added to an Exercise");
        }
        this.exerciseMuscles.add(exerciseMuscle);
        exerciseMuscle.setExercise(this);
    }

    public void removeExerciseMuscle(ExerciseMuscle em) {
        this.exerciseMuscles.remove(em);
        em.setExercise(null);
        em.setMuscle(null);
    }

    public void setExerciseMuscles(Set<ExerciseMuscle> exerciseMuscles) {
        for (ExerciseMuscle em : new HashSet<>(this.exerciseMuscles)) {
            removeExerciseMuscle(em);
        }

        if (exerciseMuscles != null) {
            exerciseMuscles.forEach(this::addExerciseMuscle);
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

}
