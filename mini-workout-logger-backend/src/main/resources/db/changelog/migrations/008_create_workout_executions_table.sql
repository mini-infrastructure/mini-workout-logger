CREATE TABLE workout_executions (

    id BIGSERIAL PRIMARY KEY,
    workout_id BIGINT NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_workout_executions_workout
        FOREIGN KEY (workout_id)
        REFERENCES workouts(id)
        ON DELETE RESTRICT

);