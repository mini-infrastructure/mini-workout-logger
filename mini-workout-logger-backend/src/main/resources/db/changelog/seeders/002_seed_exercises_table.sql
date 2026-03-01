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
SELECT add_exercise('Exercise.Chest_Press', 'STRENGTH', 'INTERMEDIATE');
SELECT add_exercise_muscle('Exercise.Chest_Press', 'Muscle.Pectoralis_Major');
SELECT add_exercise_muscle('Exercise.Chest_Press', 'Muscle.Anterior_Deltoid');
SELECT add_exercise_muscle('Exercise.Chest_Press', 'Muscle.Triceps_Brachii');

SELECT add_exercise('Exercise.Push_Up', 'STRENGTH', 'BEGINNER');
SELECT add_exercise_muscle('Exercise.Push_Up', 'Muscle.Pectoralis');
SELECT add_exercise_muscle('Exercise.Push_Up', 'Muscle.Deltoids');
SELECT add_exercise_muscle('Exercise.Push_Up', 'Muscle.Anterior_Deltoid');
SELECT add_exercise_muscle('Exercise.Push_Up', 'Muscle.Posterior_Deltoid');
SELECT add_exercise_muscle('Exercise.Push_Up', 'Muscle.Medial_Deltoid');
SELECT add_exercise_muscle('Exercise.Push_Up', 'Muscle.Triceps_Brachii');

SELECT add_exercise('Exercise.Chest_Fly', 'STRENGTH', 'NOVICE');
SELECT add_exercise_muscle('Exercise.Chest_Fly', 'Muscle.Pectoralis_Major');
SELECT add_exercise_muscle('Exercise.Chest_Fly', 'Muscle.Pectoralis_Minor');
SELECT add_exercise_muscle('Exercise.Chest_Fly', 'Muscle.Anterior_Deltoid');

-- Back.
SELECT add_exercise('Exercise.Pull_Up', 'STRENGTH', 'INTERMEDIATE');
SELECT add_exercise_muscle('Exercise.Pull_Up', 'Muscle.Latissimus_Dorsi');
SELECT add_exercise_muscle('Exercise.Pull_Up', 'Muscle.Trapezius');
SELECT add_exercise_muscle('Exercise.Pull_Up', 'Muscle.Biceps_Brachii');

-- Shoulders.
SELECT add_exercise('Exercise.Overhead_Press', 'STRENGTH', 'INTERMEDIATE');
SELECT add_exercise_muscle('Exercise.Overhead_Press', 'Muscle.Deltoids');
SELECT add_exercise_muscle('Exercise.Overhead_Press', 'Muscle.Triceps_Brachii');

SELECT add_exercise('Exercise.Reverse_Fly', 'STRENGTH', 'NOVICE');
SELECT add_exercise_muscle('Exercise.Reverse_Fly', 'Muscle.Posterior_Deltoid');
SELECT add_exercise_muscle('Exercise.Reverse_Fly', 'Muscle.Rhomboids');
SELECT add_exercise_muscle('Exercise.Reverse_Fly', 'Muscle.Trapezius');

-- Arms.
SELECT add_exercise('Exercise.Bicep_Curl', 'STRENGTH', 'BEGINNER');
SELECT add_exercise_muscle('Exercise.Bicep_Curl', 'Muscle.Biceps_Brachii');
SELECT add_exercise_muscle('Exercise.Bicep_Curl', 'Muscle.Brachialis');
SELECT add_exercise_muscle('Exercise.Bicep_Curl', 'Muscle.Brachioradialis');

SELECT add_exercise('Exercise.Seated_Row', 'STRENGTH', 'NOVICE');
SELECT add_exercise_muscle('Exercise.Seated_Row', 'Muscle.Latissimus_Dorsi');
SELECT add_exercise_muscle('Exercise.Seated_Row', 'Muscle.Rhomboids');
SELECT add_exercise_muscle('Exercise.Seated_Row', 'Muscle.Trapezius');
SELECT add_exercise_muscle('Exercise.Seated_Row', 'Muscle.Posterior_Deltoid');

-- Legs.
SELECT add_exercise('Exercise.Squat', 'STRENGTH', 'BEGINNER');
SELECT add_exercise_muscle('Exercise.Squat', 'Muscle.Quadriceps');
SELECT add_exercise_muscle('Exercise.Squat', 'Muscle.Gluteus_Maximus');
SELECT add_exercise_muscle('Exercise.Squat', 'Muscle.Hamstrings');
SELECT add_exercise_muscle('Exercise.Squat', 'Muscle.Adductors');

SELECT add_exercise('Exercise.Leg_Extension', 'STRENGTH', 'NOVICE');
SELECT add_exercise_muscle('Exercise.Leg_Extension', 'Muscle.Quadriceps');

SELECT add_exercise('Exercise.Leg_Press', 'STRENGTH', 'NOVICE');
SELECT add_exercise_muscle('Exercise.Leg_Press', 'Muscle.Quadriceps');
SELECT add_exercise_muscle('Exercise.Leg_Press', 'Muscle.Gluteus_Maximus');
SELECT add_exercise_muscle('Exercise.Leg_Press', 'Muscle.Hamstrings');

-- Core/Abs.
SELECT add_exercise('Exercise.Plank', 'STRENGTH', 'BEGINNER');
SELECT add_exercise_muscle('Exercise.Plank', 'Muscle.Rectus_Abdominis');
SELECT add_exercise_muscle('Exercise.Plank', 'Muscle.Obliques');
SELECT add_exercise_muscle('Exercise.Plank', 'Muscle.Transverse_Abdominis');
SELECT add_exercise_muscle('Exercise.Plank', 'Muscle.Erector_Spinae');

SELECT add_exercise('Exercise.Russian_Twist', 'STRENGTH', 'BEGINNER');
SELECT add_exercise_muscle('Exercise.Russian_Twist', 'Muscle.Obliques');
SELECT add_exercise_muscle('Exercise.Russian_Twist', 'Muscle.Rectus_Abdominis');
SELECT add_exercise_muscle('Exercise.Russian_Twist', 'Muscle.Transverse_Abdominis');
SELECT add_exercise_muscle('Exercise.Russian_Twist', 'Muscle.Erector_Spinae');
SELECT add_exercise_muscle('Exercise.Russian_Twist', 'Muscle.Shoulders');
SELECT add_exercise_muscle('Exercise.Russian_Twist', 'Muscle.Hip_Flexors');
