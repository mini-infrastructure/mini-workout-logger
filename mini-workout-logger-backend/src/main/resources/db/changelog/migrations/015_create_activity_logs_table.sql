CREATE TABLE activity_logs (

    id               BIGSERIAL PRIMARY KEY,
    exercise_id      BIGINT    NOT NULL,
    start_time       TIMESTAMP,
    duration_seconds BIGINT,
    completed        BOOLEAN   NOT NULL DEFAULT TRUE,

    created_at       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_activity_logs_exercise FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON DELETE RESTRICT

);

CREATE INDEX idx_activity_logs_exercise ON activity_logs(exercise_id);
CREATE INDEX idx_activity_logs_start_time ON activity_logs(start_time DESC);
