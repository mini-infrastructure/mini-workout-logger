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
    dynamic_stabilizer_muscles TEXT[] DEFAULT '{}',
    agonist_muscles TEXT[] DEFAULT '{}',
    antagonist_muscles TEXT[] DEFAULT '{}',
    antagonist_stabilizer_muscles TEXT[] DEFAULT '{}'
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

    -- AGONIST muscles
    FOREACH muscle IN ARRAY agonist_muscles
    LOOP
        PERFORM add_exercise_muscle(exercise_name, muscle, 'AGONIST');
    END LOOP;

    -- ANTAGONIST muscles
    FOREACH muscle IN ARRAY antagonist_muscles
    LOOP
        PERFORM add_exercise_muscle(exercise_name, muscle, 'ANTAGONIST');
    END LOOP;

    -- ANTAGONIST_STABILIZER muscles
    FOREACH muscle IN ARRAY antagonist_stabilizer_muscles
    LOOP
        PERFORM add_exercise_muscle(exercise_name, muscle, 'ANTAGONIST_STABILIZER');
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
SELECT add_exercise(
    'Exercise.Squat',
    'Exercise.Squat',
    'STRENGTH',
    'NOVICE',
    'BODYWEIGHT',
    'PUSH',
    'COMPOUND',
    'BASIC',
    'BILATERAL',
    ARRAY['Muscle.Quadriceps'],
    ARRAY[
        'Muscle.Gluteus_Maximus',
        'Muscle.Adductor_Magnus',
        'Muscle.Soleus'
    ],
    '{}',
    ARRAY[
        'Muscle.Hamstrings',
        'Muscle.Gastrocnemius'
    ]
);

SELECT add_exercise(
    'Exercise.Barbell_Squat',
    'Exercise.Squat',
    'STRENGTH',
    'NOVICE',
    'BARBELL',
    'PUSH',
    'COMPOUND',
    'BASIC',
    'BILATERAL',
    ARRAY['Muscle.Quadriceps'],
    ARRAY[
        'Muscle.Gluteus_Maximus',
        'Muscle.Adductor_Magnus',
        'Muscle.Soleus'
    ],
    ARRAY[
        'Muscle.Erector_Spinae'
    ],
    ARRAY[
        'Muscle.Hamstrings',
        'Muscle.Gastrocnemius'
    ],
    '{}',
    '{}',
    ARRAY[
        'Muscle.Abdominal',
        'Muscle.Obliques'
    ]
);

SELECT add_exercise(
    'Exercise.Smith_Squat',
    'Exercise.Squat',
    'STRENGTH',
    'BEGINNER',
    'MACHINE',
    'PUSH',
    'COMPOUND',
    'BASIC',
    'BILATERAL',
    ARRAY['Muscle.Quadriceps'],
    ARRAY[
        'Muscle.Gluteus_Maximus',
        'Muscle.Adductor_Magnus',
        'Muscle.Soleus'
    ],
    ARRAY[
        'Muscle.Erector_Spinae'
    ],
    ARRAY[
        'Muscle.Hamstrings',
        'Muscle.Gastrocnemius'
    ],
    '{}',
    '{}',
    ARRAY[
        'Muscle.Abdominal',
        'Muscle.Obliques'
    ]
);

SELECT add_exercise(
    'Exercise.Barbell_Split_Squat',
    'Exercise.Squat',
    'STRENGTH',
    'BEGINNER',
    'BARBELL',
    'PUSH',
    'COMPOUND',
    'AUXILIARY',
    'BILATERAL',
    ARRAY['Muscle.Quadriceps'],
    ARRAY[
        'Muscle.Gluteus_Maximus',
        'Muscle.Adductor_Magnus',
        'Muscle.Soleus'
    ],
    ARRAY[
        'Muscle.Erector_Spinae',
        'Muscle.Gluteus_Medius',
        'Muscle.Gluteus_Minimus'
    ],
    ARRAY[
        'Muscle.Hamstrings',
        'Muscle.Gastrocnemius'
    ]
);

SELECT add_exercise(
    'Exercise.Barbell_Single_Leg_Split_Squat',
    'Exercise.Squat',
    'STRENGTH',
    'INTERMEDIATE',
    'BARBELL',
    'PUSH',
    'COMPOUND',
    'AUXILIARY',
    'UNILATERAL',
    ARRAY['Muscle.Quadriceps'],
    ARRAY[
        'Muscle.Gluteus_Maximus',
        'Muscle.Adductor_Magnus',
        'Muscle.Soleus'
    ],
    ARRAY[
        'Muscle.Erector_Spinae',
        'Muscle.Gluteus_Medius',
        'Muscle.Gluteus_Minimus'
    ],
    ARRAY[
        'Muscle.Hamstrings',
        'Muscle.Gastrocnemius'
    ]
);

SELECT add_exercise(
    'Exercise.Dumbbell_Squat',
    'Exercise.Squat',
    'STRENGTH',
    'INTERMEDIATE',
    'BARBELL',
    'PUSH',
    'COMPOUND',
    'AUXILIARY',
    'UNILATERAL',
    ARRAY['Muscle.Quadriceps'],
    ARRAY[
        'Muscle.Gluteus_Maximus',
        'Muscle.Adductor_Magnus',
        'Muscle.Soleus'
    ],
    ARRAY[
        'Muscle.Erector_Spinae',
        'uscle.Upper_Trapezius',
        'Muscle.Middle_Trapezius',
        'Muscle.Levator_Scapulae',
        'Muscle.Rhomboids'
    ],
    '{}',
    ARRAY[
        'Muscle.Rectus_Femoris',
        'Muscle.Obliques'
    ]
);

SELECT add_exercise(
    'Exercise.Lunge',
    'Exercise.Lunge',
    'STRENGTH',
    'BEGINNER',
    'BODYWEIGHT',
    'PUSH',
    'COMPOUND',
    'BASIC_OR_AUXILIARY',
    'BILATERAL',
    ARRAY['Muscle.Quadriceps'],
    ARRAY[
        'Muscle.Gluteus_Maximus',
        'Muscle.Adductor_Magnus',
        'Muscle.Soleus'
    ],
    ARRAY[
        'Muscle.Tibialis_Anterior',
        'Muscle.Gluteus_Medius',
        'Muscle.Gluteus_Minimus',
        'Muscle.Quadratus_Lumborum',
        'Muscle.Obliques'
    ],
    ARRAY[
        'Muscle.Hamstrings',
        'Muscle.Gastrocnemius'
    ]
);

SELECT add_exercise(
    'Exercise.Dumbbell_Forward_Lunge',
    'Exercise.Lunge',
    'STRENGTH',
    'BEGINNER',
    'DUMBBELL',
    'PUSH',
    'COMPOUND',
    'AUXILIARY',
    'ISOLATERAL',
    ARRAY['Muscle.Quadriceps'],
    ARRAY[
        'Muscle.Gluteus_Maximus',
        'Muscle.Adductor_Magnus',
        'Muscle.Soleus'
    ],
    ARRAY[
        'Muscle.Erector_Spinae',
        'Muscle.Upper_Trapezius',
        'Muscle.Lower_Trapezius',
        'Muscle.Levator_Scapulae',
        'Muscle.Tibialis_Anterior',
        'Muscle.Gluteus_Medius',
        'Muscle.Gluteus_Minimus',
        'Muscle.Quadratus_Lumborum',
        'Muscle.Obliques'
    ],
    ARRAY[
        'Muscle.Hamstrings',
        'Muscle.Gastrocnemius'
    ]
);

SELECT add_exercise(
    'Exercise.Rear_Lunge',
    'Exercise.Lunge',
    'STRENGTH',
    'BEGINNER',
    'DUMBBELL',
    'PUSH',
    'COMPOUND',
    'BASIC_OR_AUXILIARY',
    'ISOLATERAL',
    ARRAY['Muscle.Quadriceps'],
    ARRAY[
        'Muscle.Gluteus_Maximus',
        'Muscle.Adductor_Magnus',
        'Muscle.Soleus'
    ],
    ARRAY[
        'Muscle.Gluteus_Medius',
        'Muscle.Gluteus_Minimus',
        'Muscle.Quadratus_Lumborum',
        'Muscle.Obliques'
    ],
    ARRAY[
        'Muscle.Hamstrings',
        'Muscle.Gastrocnemius'
    ]
);

SELECT add_exercise(
    'Exercise.Machine_Leg_Press_45_Degree',
    'Exercise.Leg_Press',
    'STRENGTH',
    'BEGINNER',
    'MACHINE',
    'PUSH',
    'COMPOUND',
    'BASIC',
    'BILATERAL',
    ARRAY['Muscle.Quadriceps'],
    ARRAY[
        'Muscle.Gluteus_Maximus',
        'Muscle.Adductor_Magnus',
        'Muscle.Soleus'
    ],
    '{}',
    ARRAY[
        'Muscle.Hamstrings',
        'Muscle.Gastrocnemius'
    ]
);

SELECT add_exercise(
    'Exercise.Sled_Lying_Leg_Press',
    'Exercise.Leg_Press',
    'STRENGTH',
    'BEGINNER',
    'MACHINE',
    'PUSH',
    'COMPOUND',
    'BASIC',
    'BILATERAL',
    ARRAY['Muscle.Quadriceps'],
    ARRAY[
        'Muscle.Gluteus_Maximus',
        'Muscle.Adductor_Magnus',
        'Muscle.Soleus'
    ],
    '{}',
    ARRAY[
        'Muscle.Hamstrings',
        'Muscle.Gastrocnemius'
    ]
);

SELECT add_exercise(
    'Exercise.Sled_Seated_Leg_Press',
    'Exercise.Leg_Press',
    'STRENGTH',
    'BEGINNER',
    'MACHINE',
    'PUSH',
    'COMPOUND',
    'BASIC',
    'BILATERAL',
    ARRAY['Muscle.Quadriceps'],
    ARRAY[
        'Muscle.Gluteus_Maximus',
        'Muscle.Adductor_Magnus',
        'Muscle.Soleus'
    ],
    '{}',
    ARRAY[
        'Muscle.Hamstrings',
        'Muscle.Gastrocnemius'
    ]
);

SELECT add_exercise(
    'Exercise.Kneeling_Quadriceps_Stretch',
    'Exercise.Quadriceps_Stretch',
    'STRETCHING',
    'NOVICE',
    'BODYWEIGHT',
    NULL,
    NULL,
    'AUXILIARY',
    'ISOLATERAL',
    ARRAY['Muscle.Rectus_Femoris'],
    ARRAY[
        'Muscle.Quadriceps'
    ]
);

SELECT add_exercise(
    'Exercise.Standing_Quadriceps_Stretch',
    'Exercise.Quadriceps_Stretch',
    'STRETCHING',
    'NOVICE',
    'BODYWEIGHT',
    NULL,
    NULL,
    'AUXILIARY',
    'ISOLATERAL',
    ARRAY['Muscle.Rectus_Femoris'],
    ARRAY[
        'Muscle.Quadriceps'
    ]
);

SELECT add_exercise(
    'Exercise.Standing_Calf_Raise',
    'Exercise.Calf_Raise',
    'STRENGTH',
    'BEGINNER',
    'BODYWEIGHT',
    'PUSH',
    'ISOLATED',
    'BASIC',
    'BILATERAL',
    ARRAY['Muscle.Gastrocnemius'],
    ARRAY[
        'Muscle.Soleus'
    ]
);

SELECT add_exercise(
    'Exercise.Barbell_Standing_Leg_Calf_Raise',
    'Exercise.Calf_Raise',
    'STRENGTH',
    'BEGINNER',
    'BARBELL',
    'PUSH',
    'ISOLATED',
    'BASIC',
    'BILATERAL',
    ARRAY['Muscle.Gastrocnemius'],
    ARRAY[
        'Muscle.Soleus'
    ]
);

SELECT add_exercise(
    'Exercise.Dumbbell_Standing_Calf_Raise',
    'Exercise.Calf_Raise',
    'STRENGTH',
    'BEGINNER',
    'DUMBBELL',
    'PUSH',
    'ISOLATED',
    'BASIC',
    'BILATERAL',
    ARRAY['Muscle.Gastrocnemius'],
    ARRAY[
        'Muscle.Soleus'
    ],
    ARRAY[
        'Muscle.Upper_Trapezius',
        'Muscle.Middle_Trapezius',
        'Muscle.Levator_Scapulae',
        'Muscle.Gluteus_Medius',
        'Muscle.Gluteus_Minimus'
    ]
);

SELECT add_exercise(
    'Exercise.PlateLoaded_Lever_Calf_Extension',
    'Exercise.Calf_Extension',
    'STRENGTH',
    'BEGINNER',
    'PLATE',
    'PUSH',
    'ISOLATED',
    'BASIC',
    'BILATERAL',
    ARRAY['Muscle.Gastrocnemius'],
    ARRAY[
        'Muscle.Soleus'
    ]
);

SELECT add_exercise(
    'Exercise.Weighted_Neck_Flexion',
    'Exercise.Neck_Flexion',
    'STRENGTH',
    'BEGINNER',
    'PLATE',
    'PULL',
    'ISOLATED',
    'BASIC_OR_AUXILIARY',
    NULL,
    ARRAY['Muscle.Sternocleidomastoid'],
    '{}',
    ARRAY[
        'Muscle.Abdominal',
        'Muscle.Obliques'
    ]
);

SELECT add_exercise(
    'Exercise.Cable_Neck_Flexion',
    'Exercise.Neck_Flexion',
    'STRENGTH',
    'BEGINNER',
    'CABLE',
    'PULL',
    'ISOLATED',
    'BASIC_OR_AUXILIARY',
    NULL,
    ARRAY['Muscle.Sternocleidomastoid'],
    '{}',
    ARRAY[
        'Muscle.Abdominal',
        'Muscle.Obliques'
    ]
);

SELECT add_exercise(
    'Exercise.Barbell_Curl',
    'Exercise.Curl',
    'STRENGTH',
    'BEGINNER',
    'BARBELL',
    'PULL',
    'ISOLATED',
    'BASIC',
    'BILATERAL',
    ARRAY['Muscle.Biceps'],
    ARRAY[
        'Muscle.Brachialis',
        'Muscle.Brachioradialis'
    ],
    ARRAY[
        'Muscle.Wrist_Flexors'
    ]
);

SELECT add_exercise(
    'Exercise.Dumbbell_Curl',
    'Exercise.Curl',
    'STRENGTH',
    'BEGINNER',
    'DUMBBELL',
    'PULL',
    'ISOLATED',
    'BASIC',
    'BILATERAL',
    ARRAY['Muscle.Biceps'],
    ARRAY[
        'Muscle.Brachialis',
        'Muscle.Brachioradialis'
    ],
    ARRAY[
        'Muscle.Wrist_Flexors',
        'Muscle.Levator_Scapulae',
        'Muscle.Coracobrachialis',
        'Muscle.Upper_Trapezius',
        'Muscle.Middle_Trapezius',
        'Muscle.Anterior_Deltoid'
    ]
);

SELECT add_exercise(
    'Exercise.Barbell_Preacher_Curl',
    'Exercise.Curl',
    'STRENGTH',
    'BEGINNER',
    'BARBELL',
    'PULL',
    'ISOLATED',
    'AUXILIARY',
    'BILATERAL',
    ARRAY['Muscle.Brachialis'],
    ARRAY[
        'Muscle.Biceps',
        'Muscle.Brachioradialis'
    ],
    ARRAY[
        'Muscle.Wrist_Flexors'
    ]
);

SELECT add_exercise(
    'Exercise.Lever_Preacher_Curl',
    'Exercise.Curl',
    'STRENGTH',
    'BEGINNER',
    'MACHINE',
    'PULL',
    'ISOLATED',
    'AUXILIARY',
    'BILATERAL',
    ARRAY['Muscle.Brachialis'],
    ARRAY[
        'Muscle.Biceps',
        'Muscle.Brachioradialis'
    ],
    ARRAY[
        'Muscle.Wrist_Flexors'
    ],
    '{}',
    '{}',
    ARRAY[
        'Muscle.Triceps'
    ]
);

SELECT add_exercise(
    'Exercise.Barbell_Military_Press',
    'Exercise.Overhead_Press',
    'STRENGTH',
    'NOVICE',
    'BARBELL',
    'PUSH',
    'COMPOUND',
    'BASIC',
    'BILATERAL',
    ARRAY['Muscle.Anterior_Deltoid'],
    ARRAY[
        'Muscle.Pectoralis_Major',
        'Muscle.Clavicular',
        'Muscle.Lateral_Deltoid',
        'Muscle.Coracobrachialis',
        'Muscle.Middle_Trapezius',
        'Muscle.Lower_Trapezius',
        'Muscle.Serratus_Anterior'
    ],
    ARRAY[
        'Muscle.Upper_Trapezius',
        'Muscle.Levator_Scapulae'
    ],
    ARRAY[
        'Muscle.Triceps',
        'Muscle.Biceps'
    ]
);

SELECT add_exercise(
    'Exercise.Sled_Shoulder_Press',
    'Exercise.Overhead_Press',
    'STRENGTH',
    'NOVICE',
    'MACHINE',
    'PUSH',
    'COMPOUND',
    'BASIC',
    'BILATERAL',
    ARRAY['Muscle.Anterior_Deltoid'],
    ARRAY[
        'Muscle.Supinators',
        'Muscle.Lateral_Deltoid',
        'Muscle.Pectoralis_Major',
        'Muscle.Clavicular',
        'Muscle.Coracobrachialis',
        'Muscle.Triceps',
        'Muscle.Middle_Trapezius',
        'Muscle.Lower_Trapezius',
        'Muscle.Serratus_Anterior'
    ],
    ARRAY[
        'Muscle.Upper_Trapezius',
        'Muscle.Levator_Scapulae'
    ],
    ARRAY[
        'Muscle.Triceps',
        'Muscle.Biceps'
    ]
);

SELECT add_exercise(
   'Exercise.Barbell_Upright_Row',
   'Exercise.Row',
   'STRENGTH',
   'BEGINNER',
   'BARBELL',
   'PULL',
   'COMPOUND',
   'AUXILIARY',
   'BILATERAL',
   ARRAY['Muscle.Lateral_Deltoid'],
   ARRAY[
       'Muscle.Supinators',
       'Muscle.Anterior_Deltoid',
       'Muscle.Brachialis',
       'Muscle.Biceps',
       'Muscle.Middle_Trapezius',
       'Muscle.Lower_Trapezius',
       'Muscle.Middle_Trapezius',
       'Muscle.Lower_Trapezius',
       'Muscle.Teres_Minor',
       'Muscle.Serratus_Anterior'
   ],
   ARRAY[
       'Muscle.Upper_Trapezius',
        'Muscle.Levator_Scapulae'
   ]
);