-- Adds a new exercise.
CREATE OR REPLACE FUNCTION add_exercise(exercise_name VARCHAR,
                                        exercise_category VARCHAR,
                                        exercise_difficulty VARCHAR)
RETURNS VOID AS $_$
BEGIN
    INSERT INTO exercises (name, category, difficulty, created_at, updated_at)
    VALUES (exercise_name, exercise_category, exercise_difficulty, NOW(), NOW())
    ON CONFLICT (name) DO NOTHING;

    -- Reset the sequence.
    PERFORM setval(
        pg_get_serial_sequence('exercises', 'id'),
        (SELECT MAX(id) FROM exercises)
    );
END;
$_$ LANGUAGE plpgsql;

-- Associates an exercise with a muscle and all its parent muscles.
CREATE OR REPLACE FUNCTION add_exercise_muscle(exercise_name_input VARCHAR, target_muscle_name VARCHAR)
RETURNS VOID AS $_$
DECLARE
    p_exercise_id BIGINT;
BEGIN
    -- Recover the exercise id.
    SELECT id INTO p_exercise_id FROM exercises WHERE name = exercise_name_input;

    -- Insert associations with all parent muscles (including itself).
    WITH RECURSIVE muscle_hierarchy AS (
        SELECT id, name
        FROM muscles
        WHERE name = target_muscle_name

        UNION

        SELECT m.id, m.name
        FROM muscles m
        JOIN muscle_groups mg ON m.id = mg.muscle_group_id
        JOIN muscle_hierarchy mh ON mg.muscle_id = mh.id
    )
    INSERT INTO exercises_muscles (exercise_id, muscle_id)
    SELECT p_exercise_id, id
    FROM muscle_hierarchy
    ON CONFLICT DO NOTHING;

END;
$_$ LANGUAGE plpgsql;

-- Chest exercises.
SELECT add_exercise('Chest Press', 'STRENGTH', 'INTERMEDIATE');
SELECT add_exercise_muscle('Chest Press', 'Pectoralis Major');
SELECT add_exercise_muscle('Chest Press', 'Anterior Deltoid');
SELECT add_exercise_muscle('Chest Press', 'Triceps Brachii');

SELECT add_exercise('Push-Up', 'STRENGTH', 'BEGINNER');
SELECT add_exercise_muscle('Push-Up', 'Pectorals');
SELECT add_exercise_muscle('Push-Up', 'Deltoids');
SELECT add_exercise_muscle('Push-Up', 'Triceps Brachii');

SELECT add_exercise('Chest Fly', 'STRENGTH', 'NOVICE');
SELECT add_exercise_muscle('Chest Fly', 'Pectoralis Major');
SELECT add_exercise_muscle('Chest Fly', 'Pectoralis Minor');
SELECT add_exercise_muscle('Chest Fly', 'Anterior Deltoid');

-- Back.
SELECT add_exercise('Pull-Up', 'STRENGTH', 'INTERMEDIATE');
SELECT add_exercise_muscle('Pull-Up', 'Latissimus Dorsi');
SELECT add_exercise_muscle('Pull-Up', 'Trapezius');
SELECT add_exercise_muscle('Pull-Up', 'Biceps Brachii');