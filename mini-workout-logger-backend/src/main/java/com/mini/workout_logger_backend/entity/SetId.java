package com.mini.workout_logger_backend.entity;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Getter
@Setter
public class SetId implements Serializable {

    private Long id;
    private Long workoutExerciseId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SetId setId = (SetId) o;
        return Objects.equals(id, setId.id) &&
                Objects.equals(workoutExerciseId, setId.workoutExerciseId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, workoutExerciseId);
    }

}
