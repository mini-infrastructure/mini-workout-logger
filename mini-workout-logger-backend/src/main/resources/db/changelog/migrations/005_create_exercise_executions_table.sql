CREATE TABLE exercise_executions (

    id BIGSERIAL PRIMARY KEY,
    exercise_id BIGINT NOT NULL,
    type VARCHAR(50),
    equipment VARCHAR(255),
    rest_time_seconds INTEGER,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,

    FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON UPDATE CASCADE ON DELETE RESTRICT

);