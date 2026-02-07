CREATE TABLE set_executions (

    id BIGSERIAL PRIMARY KEY,
    workout_exercise_execution_id BIGINT NOT NULL,
    set_id BIGINT NOT NULL,
    actual_repetitions INTEGER,
    actual_weight DOUBLE PRECISION,
    actual_duration_seconds INTEGER,
    completed BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_set_execution_workout_exercise_execution
        FOREIGN KEY (workout_exercise_execution_id)
        REFERENCES workout_exercise_executions(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_set_execution_set
        FOREIGN KEY (set_id)
        REFERENCES sets(id)
        ON DELETE RESTRICT

);
