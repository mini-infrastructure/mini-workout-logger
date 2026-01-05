CREATE TABLE sets (

    id BIGSERIAL PRIMARY KEY,
    workout_exercise_id BIGINT NOT NULL,
    position INTEGER,
    category VARCHAR(50) NOT NULL,
    type VARCHAR(50) NOT NULL,
    repetitions INTEGER,
    weight DOUBLE PRECISION,
    duration_seconds INTEGER,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_sets_workout_exercise
        FOREIGN KEY (workout_exercise_id)
        REFERENCES workout_exercises(id)
        ON DELETE CASCADE,

    CONSTRAINT uk_sets_order
        UNIQUE (workout_exercise_id, position)

);

CREATE INDEX idx_sets_workout_exercise ON sets(workout_exercise_id);