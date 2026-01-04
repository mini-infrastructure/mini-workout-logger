CREATE TABLE sets (

    id BIGSERIAL NOT NULL,
    workout_exercise_id BIGINT NOT NULL,
    PRIMARY KEY (id, workout_exercise_id),

    position INTEGER NOT NULL,
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

    CONSTRAINT uk_set_order
        UNIQUE (workout_exercise_id, position),

    CONSTRAINT uk_sets_id_workout_exercise
        UNIQUE (id, workout_exercise_id)

);