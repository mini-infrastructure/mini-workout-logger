CREATE TABLE exercises_muscle_groups(

    exercise_id BIGINT NOT NULL,
    muscle_group_id BIGINT NOT NULL,
    PRIMARY KEY (exercise_id, muscle_group_id),
    FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON DELETE CASCADE,
    FOREIGN KEY (muscle_group_id) REFERENCES muscle_groups(id) ON DELETE CASCADE

);