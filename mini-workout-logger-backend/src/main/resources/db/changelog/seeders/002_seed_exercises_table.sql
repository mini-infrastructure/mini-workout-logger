-- Adds a new exercise.
CREATE OR REPLACE FUNCTION add_exercise(
    exercise_name VARCHAR,
    exercise_category VARCHAR,
    exercise_difficulty VARCHAR,
    exercise_equipment VARCHAR DEFAULT NULL,
    exercise_force VARCHAR DEFAULT NULL,
    exercise_mechanics VARCHAR DEFAULT NULL
)
RETURNS VOID AS $$
DECLARE
    p_exercise_id BIGINT;
    eq VARCHAR;
BEGIN

    INSERT INTO exercises (
        name, category, difficulty, equipment, force, mechanics, created_at, updated_at
    )
    VALUES (
        exercise_name,        -- name
        exercise_category,    -- category
        exercise_difficulty,  -- difficulty
        exercise_equipment,   -- equipment
        exercise_force,       -- force
        exercise_mechanics,   -- mechanics
        NOW(),                -- created_at
        NOW()                 -- updated_at
    )
    ON CONFLICT (name) DO NOTHING;

    SELECT id INTO p_exercise_id
    FROM exercises
    WHERE name = exercise_name;

    -- reset sequence
    PERFORM setval(
        pg_get_serial_sequence('exercises','id'),
        COALESCE((SELECT MAX(id) FROM exercises),1)
    );

END;
$$ LANGUAGE plpgsql;

-- Associates an exercise with a muscle and all its parent muscles.
CREATE OR REPLACE FUNCTION add_exercise_muscle(
    exercise_name_input VARCHAR,
    muscle_name_input VARCHAR,
    muscle_role VARCHAR
)
RETURNS VOID AS $$
DECLARE
    p_exercise_id BIGINT;
BEGIN

    SELECT id INTO p_exercise_id
    FROM exercises
    WHERE name = exercise_name_input;

    WITH RECURSIVE muscle_hierarchy AS (
        SELECT id, name
        FROM muscles
        WHERE name = muscle_name_input

        UNION

        SELECT m.id, m.name
        FROM muscles m
        JOIN muscle_groups mg
            ON m.id = mg.muscle_group_id
        JOIN muscle_hierarchy mh
            ON mg.muscle_id = mh.id
    )
    INSERT INTO exercise_muscles (
        exercise_id,
        muscle_id,
        role,
        created_at,
        updated_at
    )
    SELECT
        p_exercise_id,
        id,
        muscle_role,
        NOW(),
        NOW()
    FROM muscle_hierarchy
    ON CONFLICT (exercise_id, muscle_id) DO NOTHING;

END;
$$ LANGUAGE plpgsql;

-- Chest exercises
SELECT add_exercise(
    'Exercise.Chest_Press',
    'STRENGTH',
    'INTERMEDIATE',
    'BARBELL',
    'PUSH',
    'COMPOUND'
);
SELECT add_exercise_muscle('Exercise.Chest_Press', 'Muscle.Pectoralis_Major', 'TARGET');
SELECT add_exercise_muscle('Exercise.Chest_Press', 'Muscle.Anterior_Deltoid', 'TARGET');
SELECT add_exercise_muscle('Exercise.Chest_Press', 'Muscle.Triceps_Brachii', 'TARGET');
