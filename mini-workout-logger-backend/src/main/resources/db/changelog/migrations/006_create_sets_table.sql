CREATE TABLE sets (

    id BIGSERIAL PRIMARY KEY,
    position INTEGER,
    exercise_execution_id BIGINT NOT NULL,
    category VARCHAR(50),
    type VARCHAR(50),
    repetitions INTEGER,
    weight DOUBLE PRECISION,
    duration_seconds INTEGER,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,

    FOREIGN KEY (exercise_execution_id) REFERENCES exercise_executions(id) ON UPDATE CASCADE ON DELETE RESTRICT

);