CREATE TABLE workout_exercises (

    id BIGSERIAL PRIMARY KEY,
    workout_id BIGINT NOT NULL,
    position INTEGER,
    exercise_id BIGINT NOT NULL,
    equipment VARCHAR(50),
    rest_time_seconds INTEGER,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_workout_exercises_workout
        FOREIGN KEY (workout_id)
        REFERENCES workouts(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_workout_exercises_exercise
        FOREIGN KEY (exercise_id)
        REFERENCES exercises(id)
        ON DELETE RESTRICT,

    CONSTRAINT uk_workout_exercises_order
        UNIQUE (workout_id, position)

);

CREATE INDEX idx_workout_exercises_workout_id ON workout_exercises(workout_id);
CREATE INDEX idx_workout_exercises_exercise_id ON workout_exercises(exercise_id);