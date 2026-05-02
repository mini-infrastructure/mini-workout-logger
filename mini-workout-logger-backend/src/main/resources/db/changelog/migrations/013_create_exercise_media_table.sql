CREATE TABLE exercise_media
(
    id           BIGSERIAL PRIMARY KEY,
    exercise_id  BIGINT        NOT NULL REFERENCES exercises (id) ON DELETE CASCADE,
    filename     VARCHAR(255)  NOT NULL,
    content_type VARCHAR(100)  NOT NULL,
    size         BIGINT        NOT NULL,
    content      BYTEA         NOT NULL,
    created_at   TIMESTAMP,
    updated_at   TIMESTAMP
);

CREATE INDEX idx_exercise_media_exercise_id ON exercise_media (exercise_id);
