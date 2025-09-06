CREATE TABLE exercise_executions (

    id BIGSERIAL PRIMARY KEY,
    exercise_id BIGINT NOT NULL,
    repetitions INT,
    weight DOUBLE PRECISION,
--    duration INTERVAL,

    CONSTRAINT fk_exercise
        FOREIGN KEY(exercise_id)
        REFERENCES exercises(id)
        ON DELETE CASCADE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL

);
