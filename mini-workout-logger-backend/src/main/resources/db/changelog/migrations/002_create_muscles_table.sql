CREATE TABLE muscles (

    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    muscle_group_id BIGINT,

    CONSTRAINT fk_muscle_group_id
        FOREIGN KEY(muscle_group_id)
        REFERENCES muscles (id)
        ON DELETE SET NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL

);