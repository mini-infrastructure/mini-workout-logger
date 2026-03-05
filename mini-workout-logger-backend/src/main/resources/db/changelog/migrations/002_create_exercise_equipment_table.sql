CREATE TABLE exercise_equipment (
    exercise_id BIGINT NOT NULL,
    equipment VARCHAR(50) NOT NULL,
    PRIMARY KEY (exercise_id, equipment),
    FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON DELETE CASCADE
);
