CREATE TABLE workout_tags (

    workout_id BIGINT NOT NULL,
    tag_id     BIGINT NOT NULL,

    PRIMARY KEY (workout_id, tag_id),

    CONSTRAINT fk_workout_tags_workout
        FOREIGN KEY (workout_id)
        REFERENCES workouts(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_workout_tags_tag
        FOREIGN KEY (tag_id)
        REFERENCES tags(id)
        ON DELETE CASCADE

);

CREATE INDEX idx_workout_tags_workout_id ON workout_tags(workout_id);
CREATE INDEX idx_workout_tags_tag_id     ON workout_tags(tag_id);
