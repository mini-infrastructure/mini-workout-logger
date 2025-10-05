CREATE TABLE exercises_muscles(

    exercise_id BIGINT NOT NULL,
    muscle_id BIGINT NOT NULL,
    PRIMARY KEY (exercise_id, muscle_id),
    FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON DELETE CASCADE,
    FOREIGN KEY (muscle_id) REFERENCES muscles(id) ON DELETE CASCADE

);