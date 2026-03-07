-- Adds a new exercise.
CREATE OR REPLACE FUNCTION add_exercise(
    exercise_name VARCHAR,
    exercise_category VARCHAR,
    exercise_difficulty VARCHAR,
    exercise_equipments VARCHAR[] DEFAULT NULL,
    exercise_force VARCHAR DEFAULT NULL,
    exercise_mechanics VARCHAR DEFAULT NULL
)
RETURNS VOID AS $$
DECLARE
    p_exercise_id BIGINT;
    eq VARCHAR;
BEGIN

    INSERT INTO exercises (name, category, difficulty, force, mechanics, created_at, updated_at)
    VALUES (exercise_name, exercise_category, exercise_difficulty, exercise_force, exercise_mechanics, NOW(), NOW())
    ON CONFLICT (name) DO NOTHING;

    SELECT id INTO p_exercise_id
    FROM exercises
    WHERE name = exercise_name;

    -- reset sequence
    PERFORM setval(
        pg_get_serial_sequence('exercises','id'),
        COALESCE((SELECT MAX(id) FROM exercises),1)
    );

    IF exercise_equipments IS NOT NULL THEN
        FOREACH eq IN ARRAY exercise_equipments
        LOOP
            INSERT INTO exercise_equipment (exercise_id, equipment)
            VALUES (p_exercise_id, eq)
            ON CONFLICT DO NOTHING;
        END LOOP;
    END IF;

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
    ARRAY['BARBELL','DUMBBELL','MACHINE'],
    'PUSH',
    'COMPOUND'
);
SELECT add_exercise_muscle('Exercise.Chest_Press', 'Muscle.Pectoralis_Major', 'TARGET');
SELECT add_exercise_muscle('Exercise.Chest_Press', 'Muscle.Anterior_Deltoid', 'TARGET');
SELECT add_exercise_muscle('Exercise.Chest_Press', 'Muscle.Triceps_Brachii', 'TARGET');
