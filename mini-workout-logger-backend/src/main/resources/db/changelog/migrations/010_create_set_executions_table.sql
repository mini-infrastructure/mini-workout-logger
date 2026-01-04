CREATE TABLE set_executions (

    id BIGSERIAL PRIMARY KEY,

    workout_exercise_execution_id BIGINT NOT NULL,
    workout_exercise_id BIGINT NOT NULL,
    set_id BIGINT NOT NULL,
    position INTEGER NOT NULL,
    actual_repetitions INTEGER,
    actual_weight DOUBLE PRECISION,
    actual_duration_seconds INTEGER,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_set_execution_workout_exercise_execution
        FOREIGN KEY (workout_exercise_execution_id)
        REFERENCES workout_exercise_executions(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_set_execution_set_consistency
        FOREIGN KEY (set_id, workout_exercise_id)
        REFERENCES sets(id, workout_exercise_id)
        ON DELETE RESTRICT,

    CONSTRAINT uk_set_execution_order
        UNIQUE (workout_exercise_execution_id, position)

);