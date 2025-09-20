-- Adds a new muscle.
CREATE OR REPLACE FUNCTION add_muscle(muscle_name VARCHAR, muscle_group_name VARCHAR)
RETURNS VOID AS $_$
DECLARE
    p_muscle_id BIGINT;
    p_muscle_group_id BIGINT;
BEGIN
    -- Insert new muscle.
    INSERT INTO muscles (name, created_at, updated_at)
    VALUES (muscle_name, NOW(), NOW())
    ON CONFLICT (name) DO NOTHING;

    IF muscle_group_name IS NOT NULL THEN
        -- Insert new muscle group, if it doesn't exists.
        INSERT INTO muscles (name, created_at, updated_at)
        VALUES (muscle_group_name, NOW(), NOW())
        ON CONFLICT (name) DO NOTHING;

        -- Recover the muscle group id.
        SELECT id INTO p_muscle_group_id FROM muscles WHERE name = muscle_group_name;

        -- Recover the muscle id.
        SELECT id INTO p_muscle_id FROM muscles WHERE name = muscle_name;

        -- Create the relationship.
        INSERT INTO muscle_groups (muscle_id, muscle_group_id)
        VALUES (p_muscle_id, p_muscle_group_id)
        ON CONFLICT (muscle_id, muscle_group_id) DO NOTHING;
    END IF;

    -- Reset the sequence.
    PERFORM setval(
        pg_get_serial_sequence('muscles', 'id'),
        (SELECT MAX(id) FROM muscles)
    );
END;
$_$ LANGUAGE plpgsql;

-- Chest.
SELECT add_muscle('Chest', NULL);
SELECT add_muscle('Pectorals', 'Chest');
SELECT add_muscle('Pectoralis Major', 'Pectorals');
SELECT add_muscle('Pectoralis Minor', 'Pectorals');

-- Back.
SELECT add_muscle('Back', NULL);
SELECT add_muscle('Upper Back', 'Back');
SELECT add_muscle('Lower Back', 'Back');
SELECT add_muscle('Rhomboids', 'Upper Back');
SELECT add_muscle('Rhomboids Major', 'Rhomboids');
SELECT add_muscle('Rhomboids Minor', 'Rhomboids');
SELECT add_muscle('Latissimus Dorsi', 'Upper Back');
SELECT add_muscle('Latissimus Dorsi', 'Lower Back');
SELECT add_muscle('Trapezius', 'Upper Back');
SELECT add_muscle('Erector Spinae', 'Lower Back');
SELECT add_muscle('Quadratus Lumborum', 'Lower Back');
SELECT add_muscle('Multifidus', 'Lower Back');

-- Shoulders.
SELECT add_muscle('Shoulders', NULL);
SELECT add_muscle('Deltoids', 'Shoulders');
SELECT add_muscle('Anterior Deltoid', 'Deltoids');
SELECT add_muscle('Posterior Deltoid', 'Deltoids');
SELECT add_muscle('Medial Deltoid', 'Deltoids');
SELECT add_muscle('Rotator Cuff', 'Shoulders');

-- Arms.
SELECT add_muscle('Arms', NULL);
SELECT add_muscle('Biceps Brachii', 'Arms');
SELECT add_muscle('Triceps Brachii', 'Arms');
SELECT add_muscle('Forearms', 'Arms');

-- Legs.
SELECT add_muscle('Legs', NULL);
SELECT add_muscle('Upper Legs', 'Legs');
SELECT add_muscle('Lower Legs', 'Legs');
SELECT add_muscle('Quadriceps', 'Upper Legs');
SELECT add_muscle('Hamstrings', 'Upper Legs');
SELECT add_muscle('Hips', 'Upper Legs');
SELECT add_muscle('Calves', 'Lower Legs');
SELECT add_muscle('Gluteals', 'Hips');
SELECT add_muscle('Gluteus Maximus', 'Gluteals');
SELECT add_muscle('Gluteus Medius', 'Gluteals');
SELECT add_muscle('Gluteus Minimus', 'Gluteals');
SELECT add_muscle('Adductors', 'Hips');
SELECT add_muscle('Abductors', 'Hips');

-- Core/Abs.
SELECT add_muscle('Core', NULL);
SELECT add_muscle('Lower Back', 'Core');
SELECT add_muscle('Abdominals', 'Core');
SELECT add_muscle('Obliques', 'Core');
SELECT add_muscle('Rectus Abdominis', 'Abdominals');
