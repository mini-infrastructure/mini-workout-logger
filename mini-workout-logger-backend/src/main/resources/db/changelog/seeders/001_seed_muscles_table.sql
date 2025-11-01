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
SELECT add_muscle('Muscle.Chest', NULL);
SELECT add_muscle('Muscle.Pectoralis', 'Muscle.Chest');
SELECT add_muscle('Muscle.Pectoralis_Major', 'Muscle.Pectoralis');
SELECT add_muscle('Muscle.Pectoralis_Minor', 'Muscle.Pectoralis');

-- Back.
SELECT add_muscle('Muscle.Back', NULL);
SELECT add_muscle('Muscle.Upper_Back', 'Muscle.Back');
SELECT add_muscle('Muscle.Lower_Back', 'Muscle.Back');
SELECT add_muscle('Muscle.Rhomboids', 'Muscle.Upper_Back');
SELECT add_muscle('Muscle.Rhomboids_Major', 'Muscle.Rhomboids');
SELECT add_muscle('Muscle.Rhomboids_Minor', 'Muscle.Rhomboids');
SELECT add_muscle('Muscle.Latissimus_Dorsi', 'Muscle.Upper_Back');
SELECT add_muscle('Muscle.Latissimus_Dorsi', 'Muscle.Lower_Back');
SELECT add_muscle('Muscle.Trapezius', 'Muscle.Upper_Back');
SELECT add_muscle('Muscle.Erector_Spinae', 'Muscle.Lower_Back');
SELECT add_muscle('Muscle.Quadratus_Lumborum', 'Muscle.Lower_Back');
SELECT add_muscle('Muscle.Multifidus', 'Muscle.Lower_Back');

-- Shoulders.
SELECT add_muscle('Muscle.Shoulders', NULL);
SELECT add_muscle('Muscle.Deltoids', 'Muscle.Shoulders');
SELECT add_muscle('Muscle.Anterior_Deltoid', 'Muscle.Deltoids');
SELECT add_muscle('Muscle.Posterior_Deltoid', 'Muscle.Deltoids');
SELECT add_muscle('Muscle.Medial_Deltoid', 'Muscle.Deltoids');
SELECT add_muscle('Muscle.Rotator_Cuff', 'Muscle.Shoulders');
SELECT add_muscle('Muscle.Teres_Minor', 'Muscle.Rotator_Cuff');

-- Arms.
SELECT add_muscle('Muscle.Arms', NULL);
SELECT add_muscle('Muscle.Biceps_Brachii', 'Muscle.Arms');
SELECT add_muscle('Muscle.Triceps_Brachii', 'Muscle.Arms');
SELECT add_muscle('Muscle.Forearms', 'Muscle.Arms');
SELECT add_muscle('Muscle.Brachioradialis', 'Muscle.Forearms');
SELECT add_muscle('Muscle.Brachialis', 'Muscle.Arms');

-- Legs.
SELECT add_muscle('Muscle.Legs', NULL);
SELECT add_muscle('Muscle.Upper_Legs', 'Muscle.Legs');
SELECT add_muscle('Muscle.Lower_Legs', 'Muscle.Legs');
SELECT add_muscle('Muscle.Quadriceps', 'Muscle.Upper_Legs');
SELECT add_muscle('Muscle.Rectus_Femoris', 'Muscle.Quadriceps');
SELECT add_muscle('Muscle.Vastus_Lateralis', 'Muscle.Quadriceps');
SELECT add_muscle('Muscle.Vastus_Medialis', 'Muscle.Quadriceps');
SELECT add_muscle('Muscle.Vastus_Intermedius', 'Muscle.Quadriceps');
SELECT add_muscle('Muscle.Hamstrings', 'Muscle.Upper_Legs');
SELECT add_muscle('Muscle.Hips', 'Muscle.Upper_Legs');
SELECT add_muscle('Muscle.Calves', 'Muscle.Lower_Legs');
SELECT add_muscle('Muscle.Gluteals', 'Muscle.Hips');
SELECT add_muscle('Muscle.Gluteus_Maximus', 'Muscle.Gluteals');
SELECT add_muscle('Muscle.Gluteus_Medius', 'Muscle.Gluteals');
SELECT add_muscle('Muscle.Gluteus_Minimus', 'Muscle.Gluteals');
SELECT add_muscle('Muscle.Adductors', 'Muscle.Hips');
SELECT add_muscle('Muscle.Abductors', 'Muscle.Hips');
SELECT add_muscle('Muscle.Hip_Flexors', 'Muscle.Hips');

-- Core/Abs.
SELECT add_muscle('Muscle.Core', NULL);
SELECT add_muscle('Muscle.Lower_Back', 'Muscle.Core');
SELECT add_muscle('Muscle.Abdominals', 'Muscle.Core');
SELECT add_muscle('Muscle.Obliques', 'Muscle.Core');
SELECT add_muscle('Muscle.Erector_Spinae', 'Muscle.Core');
SELECT add_muscle('Muscle.Rectus_Abdominis', 'Muscle.Abdominals');
SELECT add_muscle('Muscle.Transverse_Abdominis', 'Muscle.Abdominals');
