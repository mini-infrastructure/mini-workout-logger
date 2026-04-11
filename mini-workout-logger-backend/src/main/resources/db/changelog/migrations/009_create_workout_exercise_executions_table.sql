CREATE TABLE workout_exercise_executions (

    id BIGSERIAL PRIMARY KEY,
    workout_execution_id BIGINT NOT NULL,
    workout_exercise_id BIGINT NOT NULL,
    skipped BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_workout_exercise_execution_workout_execution
        FOREIGN KEY (workout_execution_id)
        REFERENCES workout_executions(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_workout_exercise_execution_workout_exercise
        FOREIGN KEY (workout_exercise_id)
        REFERENCES workout_exercises(id)
        ON DELETE RESTRICT

);