CREATE TABLE exercise_muscles (

    id BIGSERIAL PRIMARY KEY,

    exercise_id BIGINT NOT NULL,
    muscle_id BIGINT NOT NULL,

    role VARCHAR(50) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,

    CONSTRAINT fk_exercise_muscle_exercise
        FOREIGN KEY (exercise_id)
        REFERENCES exercises(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_exercise_muscle_muscle
        FOREIGN KEY (muscle_id)
        REFERENCES muscles(id)
        ON DELETE CASCADE,

    CONSTRAINT uk_exercise_muscle
        UNIQUE (exercise_id, muscle_id)

);

CREATE INDEX idx_exercise_muscle_exercise ON exercise_muscles(exercise_id);
CREATE INDEX idx_exercise_muscle_muscle ON exercise_muscles(muscle_id);
CREATE INDEX idx_exercise_muscle_role ON exercise_muscles(role);