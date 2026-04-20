CREATE TABLE exercises (

    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    category VARCHAR(255),
    difficulty VARCHAR(50),
    equipment VARCHAR(50) NOT NULL,
    force VARCHAR(50),
    mechanics VARCHAR(50),
    role VARCHAR(50),
    type VARCHAR(50),
    group_id BIGINT NOT NULL,
    favorited BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,

    CONSTRAINT fk_exercises_group
        FOREIGN KEY (group_id)
        REFERENCES exercise_groups(id)
        ON DELETE SET NULL

);

CREATE INDEX idx_exercises_name ON exercises(name);
CREATE INDEX idx_exercises_category ON exercises(category);
CREATE INDEX idx_exercises_difficulty ON exercises(difficulty);