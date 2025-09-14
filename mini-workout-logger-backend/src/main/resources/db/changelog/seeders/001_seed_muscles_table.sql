-- Adds a new muscle.
CREATE OR REPLACE FUNCTION add_muscle(p_name VARCHAR, p_muscle_group_name VARCHAR)
RETURNS VOID AS $_$
BEGIN
    INSERT INTO muscles (name, muscle_group_id, created_at, updated_at)
    VALUES (
        p_name,
        (SELECT id FROM muscles WHERE name = p_muscle_group_name),
        NOW(),
        NOW()
    );

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

-- Shoulders.
SELECT add_muscle('Shoulders', NULL);
SELECT add_muscle('Deltoids', 'Shoulders');
SELECT add_muscle('Trapezius', 'Shoulders');

-- Arms.
SELECT add_muscle('Arms', NULL);
SELECT add_muscle('Biceps', 'Arms');
SELECT add_muscle('Triceps', 'Arms');
SELECT add_muscle('Forearms', 'Arms');

-- Legs.
SELECT add_muscle('Legs', NULL);
SELECT add_muscle('Quadriceps', 'Legs');
SELECT add_muscle('Hamstrings', 'Legs');
SELECT add_muscle('Glutes', 'Legs');
SELECT add_muscle('Calves', 'Legs');

-- Core/Abs.
SELECT add_muscle('Core/Abs', NULL);
SELECT add_muscle('Abdominals', 'Core/Abs');
SELECT add_muscle('Erector Spinae', 'Core/Abs');
