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

-- Neck
SELECT add_muscle('Muscle.Neck', NULL);
SELECT add_muscle('Muscle.Neck_Flexors', 'Muscle.Neck');
SELECT add_muscle('Muscle.Neck_Extensors', 'Muscle.Neck');
SELECT add_muscle('Muscle.Sternocleidomastoid', 'Muscle.Neck');
SELECT add_muscle('Muscle.Splenius', 'Muscle.Neck');

-- Shoulders
SELECT add_muscle('Muscle.Shoulders', NULL);
SELECT add_muscle('Muscle.Deltoids', 'Muscle.Shoulders');
SELECT add_muscle('Muscle.Anterior_Deltoid', 'Muscle.Deltoids');
SELECT add_muscle('Muscle.Lateral_Deltoid', 'Muscle.Deltoids');
SELECT add_muscle('Muscle.Posterior_Deltoid', 'Muscle.Deltoids');
SELECT add_muscle('Muscle.Rotator_Cuff', 'Muscle.Shoulders');
SELECT add_muscle('Muscle.Supraspinatus', 'Muscle.Rotator_Cuff');

-- Arms
SELECT add_muscle('Muscle.Arms', NULL);
-- Arms/Upper Arms
SELECT add_muscle('Muscle.Upper_Arms', 'Muscle.Arms');
SELECT add_muscle('Muscle.Triceps', 'Muscle.Upper_Arms');
SELECT add_muscle('Muscle.Biceps', 'Muscle.Upper_Arms');
SELECT add_muscle('Muscle.Brachialis', 'Muscle.Upper_Arms');
SELECT add_muscle('Muscle.Coracobrachialis', 'Muscle.Upper_Arms');
-- Arms/Forearms
SELECT add_muscle('Muscle.Forearms', 'Muscle.Arms');
SELECT add_muscle('Muscle.Brachioradialis', 'Muscle.Forearms');
SELECT add_muscle('Muscle.Flexor_Carpi_Radialis', 'Muscle.Forearms');
SELECT add_muscle('Muscle.Extensor_Carpi_Radialis_Longus', 'Muscle.Forearms');
SELECT add_muscle('Muscle.Flexor_Carpi_Ulnaris', 'Muscle.Forearms');
SELECT add_muscle('Muscle.Extensor_Digitorum', 'Muscle.Forearms');
SELECT add_muscle('Muscle.Anconeus', 'Muscle.Forearms');
SELECT add_muscle('Muscle.Wrist', 'Muscle.Forearms');
SELECT add_muscle('Muscle.Wrist_Flexors', 'Muscle.Wrist');
SELECT add_muscle('Muscle.Wrist_Extensors', 'Muscle.Wrist');
SELECT add_muscle('Muscle.Pronators', 'Muscle.Forearms');
SELECT add_muscle('Muscle.Supinators', 'Muscle.Forearms');

-- Back
SELECT add_muscle('Muscle.Back', NULL);

SELECT add_muscle('Muscle.Latissimus_Dorsi', 'Muscle.Back');
SELECT add_muscle('Muscle.Thoracolumbar_Fascia', 'Muscle.Back');
SELECT add_muscle('Muscle.Teres_Major', 'Muscle.Back');
SELECT add_muscle('Muscle.Trapezius', 'Muscle.Back');
SELECT add_muscle('Muscle.Upper_Trapezius', 'Muscle.Trapezius');
SELECT add_muscle('Muscle.Middle_Trapezius', 'Muscle.Trapezius');
SELECT add_muscle('Muscle.Lower_Trapezius', 'Muscle.Trapezius');
SELECT add_muscle('Muscle.Levator_Scapulae', 'Muscle.Back');
SELECT add_muscle('Muscle.Rhomboids', 'Muscle.Back');
SELECT add_muscle('Muscle.Rhomboids_Major', 'Muscle.Rhomboids');
SELECT add_muscle('Muscle.Rhomboids_Minor', 'Muscle.Rhomboids');
SELECT add_muscle('Muscle.Rotator_Cuff', 'Muscle.Back');
SELECT add_muscle('Muscle.Infraspinatus', 'Muscle.Rotator_Cuff');
SELECT add_muscle('Muscle.Teres_Minor', 'Muscle.Rotator_Cuff');
SELECT add_muscle('Muscle.Subscapularis', 'Muscle.Back');

-- Chest
SELECT add_muscle('Muscle.Chest', NULL);
SELECT add_muscle('Muscle.Pectoralis', 'Muscle.Chest');
SELECT add_muscle('Muscle.Pectoralis_Major', 'Muscle.Pectoralis');
SELECT add_muscle('Muscle.Sternal', 'Muscle.Pectoralis_Major');
SELECT add_muscle('Muscle.Clavicular', 'Muscle.Pectoralis_Major');
SELECT add_muscle('Muscle.Pectoralis_Minor', 'Muscle.Pectoralis');
SELECT add_muscle('Muscle.Serratus_Anterior', 'Muscle.Chest');

-- Core/Abs/Waist
SELECT add_muscle('Muscle.Core', NULL);
SELECT add_muscle('Muscle.Abdominal', 'Muscle.Core');
SELECT add_muscle('Muscle.Transverse_Abs', 'Muscle.Core');
SELECT add_muscle('Muscle.Obliques', 'Muscle.Core');
SELECT add_muscle('Muscle.Internal_Obliques', 'Muscle.Obliques');
SELECT add_muscle('Muscle.External_Obliques', 'Muscle.Obliques');
SELECT add_muscle('Muscle.Quadratus_Lumborum', 'Muscle.Core');
SELECT add_muscle('Muscle.Erector_Spinae', 'Muscle.Core');

-- Legs
SELECT add_muscle('Muscle.Legs', NULL);
-- Legs/Hips
SELECT add_muscle('Muscle.Hips', 'Muscle.Legs');
SELECT add_muscle('Muscle.Glutes', 'Muscle.Hips');
SELECT add_muscle('Muscle.Gluteus_Maximus', 'Muscle.Glutes');
SELECT add_muscle('Muscle.Gluteus_Medius', 'Muscle.Glutes');
SELECT add_muscle('Muscle.Gluteus_Minimus', 'Muscle.Glutes');
SELECT add_muscle('Muscle.Abductors', 'Muscle.Hips');
SELECT add_muscle('Muscle.Gluteus_Medius', 'Muscle.Abductors');
SELECT add_muscle('Muscle.Gluteus_Minimus', 'Muscle.Abductors');
SELECT add_muscle('Muscle.Flexors', 'Muscle.Hips');
SELECT add_muscle('Muscle.Iliopsoas', 'Muscle.Flexors');
SELECT add_muscle('Muscle.Rectus_Femoris', 'Muscle.Flexors');
SELECT add_muscle('Muscle.Sartorius', 'Muscle.Flexors');
SELECT add_muscle('Muscle.Tensor_Fasciae_Latae', 'Muscle.Flexors');
SELECT add_muscle('Muscle.Pectineus', 'Muscle.Flexors');
SELECT add_muscle('Muscle.Deep_External_Rotators', 'Muscle.Hips');
-- Legs/Thighs
SELECT add_muscle('Muscle.Thighs', 'Muscle.Legs');
SELECT add_muscle('Muscle.Quadriceps', 'Muscle.Thighs');
SELECT add_muscle('Muscle.Rectus_Femoris', 'Muscle.Quadriceps');
SELECT add_muscle('Muscle.Vastus', 'Muscle.Quadriceps');
SELECT add_muscle('Muscle.Vastus_Lateralis', 'Muscle.Vastus');
SELECT add_muscle('Muscle.Vastus_Medialis', 'Muscle.Vastus');
SELECT add_muscle('Muscle.Vastus_Intermedius', 'Muscle.Vastus');
SELECT add_muscle('Muscle.Hamstrings', 'Muscle.Thighs');
SELECT add_muscle('Muscle.Biceps_Femoris', 'Muscle.Hamstrings');
SELECT add_muscle('Muscle.liotibial_Tract', 'Muscle.Hamstrings');
SELECT add_muscle('Muscle.Semitendinosus', 'Muscle.Hamstrings');
SELECT add_muscle('Muscle.Semimembranosus', 'Muscle.Hamstrings');
SELECT add_muscle('Muscle.Hip_Adductors', 'Muscle.Thighs');
SELECT add_muscle('Muscle.Adductor_Brevis', 'Muscle.Hip_Adductors');
SELECT add_muscle('Muscle.Adductor_Longus', 'Muscle.Hip_Adductors');
SELECT add_muscle('Muscle.Adductor_Magnus', 'Muscle.Hip_Adductors');
SELECT add_muscle('Muscle.Gracilis', 'Muscle.Hip_Adductors');
-- Legs/Calves
SELECT add_muscle('Muscle.Calves', 'Muscle.Legs');
SELECT add_muscle('Muscle.Gastrocnemius', 'Muscle.Calves');
SELECT add_muscle('Muscle.Soleus', 'Muscle.Calves');
SELECT add_muscle('Muscle.Tibialis_Anterior', 'Muscle.Calves');
SELECT add_muscle('Muscle.Fibularis_Longus', 'Muscle.Calves');
SELECT add_muscle('Muscle.Fibularis_Brevis', 'Muscle.Calves');
SELECT add_muscle('Muscle.Popliteus', 'Muscle.Calves');
SELECT add_muscle('Muscle.Achilles_Tendon', 'Muscle.Calves');
-- Legs/Ankle
SELECT add_muscle('Muscle.Ankle', 'Muscle.Legs');
SELECT add_muscle('Muscle.Feet', 'Muscle.Legs');
