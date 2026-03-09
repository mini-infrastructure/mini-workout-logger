CREATE OR REPLACE FUNCTION add_exercise(
    exercise_name VARCHAR,
    exercise_group_name VARCHAR,
    exercise_category VARCHAR,
    exercise_difficulty VARCHAR,
    exercise_equipment VARCHAR DEFAULT NULL,
    exercise_force VARCHAR DEFAULT NULL,
    exercise_mechanics VARCHAR DEFAULT NULL,
    exercise_role VARCHAR DEFAULT NULL,
    exercise_type VARCHAR DEFAULT NULL,
    target_muscles TEXT[] DEFAULT '{}',
    synergist_muscles TEXT[] DEFAULT '{}',
    stabilizer_muscles TEXT[] DEFAULT '{}',
    dynamic_stabilizer_muscles TEXT[] DEFAULT '{}'
)
RETURNS VOID AS $$
DECLARE
    p_exercise_id BIGINT;
    p_group_id BIGINT;
    muscle TEXT;
BEGIN

    -- Exercise group
    INSERT INTO exercise_groups (name, created_at, updated_at)
    VALUES (exercise_group_name, NOW(), NOW())
    ON CONFLICT (name) DO NOTHING;

    SELECT id INTO p_group_id
    FROM exercise_groups
    WHERE name = exercise_group_name;

    -- Insert exercise
    INSERT INTO exercises (
        name,
        category,
        difficulty,
        equipment,
        force,
        mechanics,
        role,
        type,
        group_id,
        created_at,
        updated_at
    )
    VALUES (
        exercise_name,
        exercise_category,
        exercise_difficulty,
        exercise_equipment,
        exercise_force,
        exercise_mechanics,
        exercise_role,
        exercise_type,
        p_group_id,
        NOW(),
        NOW()
    )
    ON CONFLICT (name) DO NOTHING;

    SELECT id INTO p_exercise_id
    FROM exercises
    WHERE name = exercise_name;

    -- TARGET muscles
    FOREACH muscle IN ARRAY target_muscles
    LOOP
        PERFORM add_exercise_muscle(exercise_name, muscle, 'TARGET');
    END LOOP;

    -- SYNERGIST muscles
    FOREACH muscle IN ARRAY synergist_muscles
    LOOP
        PERFORM add_exercise_muscle(exercise_name, muscle, 'SYNERGIST');
    END LOOP;

    -- STABILIZER muscles
    FOREACH muscle IN ARRAY stabilizer_muscles
    LOOP
        PERFORM add_exercise_muscle(exercise_name, muscle, 'STABILIZER');
    END LOOP;

    -- DYNAMIC_STABILIZER muscles
    FOREACH muscle IN ARRAY dynamic_stabilizer_muscles
    LOOP
        PERFORM add_exercise_muscle(exercise_name, muscle, 'DYNAMIC_STABILIZER');
    END LOOP;

    -- Reset sequence
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

-- Template
--SELECT add_exercise(
--    'Exercise.**',
--    'Exercise.**',
--    'CATEGORY',
--    'DIFFICULTY',
--    'EQUIPMENT',
--    'FORCE',
--    'MECHANICS',
--    'ROLE',
--    'TYPE',
--    ARRAY[
--        '',
--        ''
--    ],
--    ARRAY[
--        '',
--        ''
--    ],
--    ARRAY[
--        '',
--        ''
--    ],
--    ARRAY[
--        '',
--        ''
--    ]
--);

-- Chest exercises
SELECT add_exercise(
    'Exercise.Cable_Isolateral_Lying_Fly',
    'Exercise.Chest_Fly',
    'STRENGTH',
    'BEGINNER',
    'CABLE',
    'PUSH',
    'ISOLATED',
    'AUXILIARY',
    'ISOLATERAL',
    ARRAY['Muscle.Sternal'],
    ARRAY[
        'Muscle.Clavicular',
        'Muscle.Anterior_Deltoid',
        'Muscle.Biceps',
        'Muscle.Coracobrachialis'
    ],
    ARRAY[
        'Muscle.Wrist_Flexors',
        'Muscle.Triceps',
        'Muscle.Brachialis'
    ]
);

SELECT add_exercise(
    'Exercise.Cable_Isolateral_Cable_Fly',
    'Exercise.Chest_Fly',
    'STRENGTH',
    'BEGINNER',
    'CABLE',
    'PUSH',
    'ISOLATED',
    'AUXILIARY',
    'ISOLATERAL',
    ARRAY['Muscle.Sternal'],
    ARRAY[
        'Muscle.Clavicular',
        'Muscle.Anterior_Deltoid',
        'Muscle.Biceps',
        'Muscle.Coracobrachialis'
    ],
    ARRAY[
        'Muscle.Wrist_Flexors',
        'Muscle.Triceps',
        'Muscle.Brachialis'
    ]
);

SELECT add_exercise(
    'Exercise.Cable_Isolateral_Standing_Fly',
    'Exercise.Chest_Fly',
    'STRENGTH',
    'BEGINNER',
    'CABLE',
    'PUSH',
    'ISOLATED',
    'AUXILIARY',
    'ISOLATERAL',
    ARRAY['Muscle.Sternal'],
    ARRAY[
        'Muscle.Clavicular',
        'Muscle.Pectoralis_Minor',
        'Muscle.Rhomboids',
        'Muscle.Levator_Scapulae',
        'Muscle.Latissimus_Dorsi',
        'Muscle.Coracobrachialis'
    ],
    ARRAY[
        'Muscle.Biceps',
        'Muscle.Brachialis',
        'Muscle.Triceps',
        'Muscle.Wrist_Flexors',
        'Muscle.Abdominal',
        'Muscle.Obliques',
        'Muscle.Erector_Spinae'
    ]
);

SELECT add_exercise(
    'Exercise.Cable_Isolateral_Bench_Press',
    'Exercise.Chest_Press',
    'STRENGTH',
    'NOVICE',
    'CABLE',
    'PUSH',
    'COMPOUND',
    'BASIC_OR_AUXILIARY',
    'ISOLATERAL',
    ARRAY['Muscle.Sternal'],
    ARRAY[
        'Muscle.Clavicular',
        'Muscle.Anterior_Deltoid',
        'Muscle.Triceps',
        'Muscle.Coracobrachialis'
    ],
    '{}',
    ARRAY[
    'Muscle.Biceps'
    ]
);

SELECT add_exercise(
    'Exercise.Cable_Isolateral_Chest_Press',
    'Exercise.Chest_Press',
    'STRENGTH',
    'NOVICE',
    'CABLE',
    'PUSH',
    'COMPOUND',
    'BASIC_OR_AUXILIARY',
    'ISOLATERAL',
    ARRAY['Muscle.Sternal'],
    ARRAY[
        'Muscle.Clavicular',
        'Muscle.Anterior_Deltoid',
        'Muscle.Triceps',
        'Muscle.Coracobrachialis'
    ],
    ARRAY[
        'Muscle.Biceps'
    ]
);

-- Legs
--SELECT add_exercise(
--    'Exercise.Barbell_Squat',
--    'Exercise.Squat',
--    'STRENGTH',
--    'INTERMEDIATE',
--    'BARBELL',
--    'PUSH',
--    'COMPOUND',
--    'BASIC',
--    'ISOLATERAL',
--    ARRAY['Muscle.Quadriceps'],
--    ARRAY[
--        '',
--        ''
--    ],
--    ARRAY[
--        '',
--        ''
--    ]
--);

