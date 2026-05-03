CREATE TABLE exercise_media
(
    id           BIGSERIAL PRIMARY KEY,
    exercise_id  BIGINT        NOT NULL REFERENCES exercises (id) ON DELETE CASCADE,
    role         VARCHAR(20)   NOT NULL DEFAULT 'COVER',
    filename     VARCHAR(255)  NOT NULL,
    content_type VARCHAR(100)  NOT NULL,
    size         BIGINT        NOT NULL,
    content      BYTEA         NOT NULL,
    created_at   TIMESTAMP,
    updated_at   TIMESTAMP,
    CONSTRAINT uq_exercise_media_role UNIQUE (exercise_id, role)
);

CREATE INDEX idx_exercise_media_exercise_id ON exercise_media (exercise_id);
