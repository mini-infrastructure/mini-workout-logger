CREATE TABLE muscle_groups (

    muscle_id BIGINT NOT NULL,
    muscle_group_id BIGINT NOT NULL,
    PRIMARY KEY (muscle_id, muscle_group_id),
    FOREIGN KEY (muscle_id) REFERENCES muscles(id) ON DELETE CASCADE,
    FOREIGN KEY (muscle_group_id) REFERENCES muscles(id) ON DELETE CASCADE,

    CONSTRAINT chk_no_self_reference
        CHECK (muscle_id <> muscle_group_id)

);