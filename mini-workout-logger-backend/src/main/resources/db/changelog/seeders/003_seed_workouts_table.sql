CREATE OR REPLACE FUNCTION add_workout(workout_name VARCHAR)
RETURNS BIGINT AS $$
DECLARE
    v_workout_id BIGINT;
BEGIN
    INSERT INTO workouts (name, created_at, updated_at)
    VALUES (workout_name, NOW(), NOW())
    ON CONFLICT (name) DO NOTHING;

    SELECT id INTO v_workout_id
    FROM workouts
    WHERE name = workout_name;

    RETURN v_workout_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION add_workout_exercise(
    p_workout_id BIGINT,
    p_exercise_name VARCHAR,
    p_position INTEGER,
    p_role VARCHAR,
    p_equipment VARCHAR DEFAULT NULL,
    p_rest_time_seconds INTEGER DEFAULT NULL
)
RETURNS BIGINT AS $$
DECLARE
    v_exercise_id BIGINT;
    v_workout_exercise_id BIGINT;
BEGIN
    SELECT id INTO v_exercise_id
    FROM exercises
    WHERE name = p_exercise_name;

    IF v_exercise_id IS NULL THEN
        RAISE EXCEPTION 'Exercise % not found', p_exercise_name;
    END IF;

    INSERT INTO workout_exercises (
        workout_id,
        exercise_id,
        position,
        role,
        equipment,
        rest_time_seconds,
        created_at,
        updated_at
    )
    VALUES (
        p_workout_id,
        v_exercise_id,
        p_position,
        p_role,
        p_equipment,
        p_rest_time_seconds,
        NOW(),
        NOW()
    );

    SELECT id INTO v_workout_exercise_id
    FROM workout_exercises
    WHERE workout_id = p_workout_id
      AND position = p_position;

    RETURN v_workout_exercise_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION add_set(
    p_workout_exercise_id BIGINT,
    p_position INTEGER,
    p_category VARCHAR,
    p_type VARCHAR,
    p_repetitions INTEGER,
    p_weight DOUBLE PRECISION,
    p_duration_seconds INTEGER DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO sets (
        workout_exercise_id,
        position,
        category,
        type,
        repetitions,
        weight,
        duration_seconds,
        created_at,
        updated_at
    )
    VALUES (
        p_workout_exercise_id,
        p_position,
        p_category,
        p_type,
        p_repetitions,
        p_weight,
        p_duration_seconds,
        NOW(),
        NOW()
    );
    ---ON CONFLICT (workout_exercise_id, position) DO NOTHING;
END;
$$ LANGUAGE plpgsql;

DO $$
DECLARE
    v_workout_id BIGINT;
    v_we_1 BIGINT;
    v_we_2 BIGINT;
BEGIN
    ------------------------------------------------------------------
    -- WORKOUT 1: Treino Peito Básico
    ------------------------------------------------------------------
    v_workout_id := add_workout('Treino Peito Básico');

    v_we_1 := add_workout_exercise(
        v_workout_id,
        'Exercise.Chest_Press',
        0,
        'BASIC',
        'BARBELL',
        90
    );

--    v_we_2 := add_workout_exercise(
--        v_workout_id,
--        'Exercise.Push_Up',
--        1,
--        'AUXILIARY',
--        'BODYWEIGHT',
--        60
--    );

    PERFORM add_set(v_we_1, 0, 'WARMUP', 'REPS_X_WEIGHT', 12, 40);
    PERFORM add_set(v_we_1, 1, 'NORMAL',   'REPS_X_WEIGHT', 10, 60);
    PERFORM add_set(v_we_1, 2, 'NORMAL',   'REPS_X_WEIGHT', 8,  70);

--    PERFORM add_set(v_we_2, 0, 'NORMAL', 'REPS_X_WEIGHT', 15, NULL);
--    PERFORM add_set(v_we_2, 1, 'NORMAL', 'REPS_X_WEIGHT', 12, NULL);
--    PERFORM add_set(v_we_2, 2, 'NORMAL', 'REPS_X_WEIGHT', 10, NULL);

    ------------------------------------------------------------------
    -- WORKOUT 2: Treino Peito + Ombro
    ------------------------------------------------------------------
    v_workout_id := add_workout('Treino Peito + Ombro');

    v_we_1 := add_workout_exercise(
        v_workout_id,
        'Exercise.Chest_Press',
        0,
        'BASIC',
        'BARBELL',
        90
    );

--    v_we_2 := add_workout_exercise(
--        v_workout_id,
--        'Exercise.Chest_Fly',
--        1,
--        'AUXILIARY',
--        'DUMBBELL',
--        75
--    );

    PERFORM add_set(v_we_1, 0, 'NORMAL', 'REPS_X_WEIGHT', 10, 60);
    PERFORM add_set(v_we_1, 1, 'NORMAL', 'REPS_X_WEIGHT', 8,  70);
    PERFORM add_set(v_we_1, 2, 'NORMAL', 'REPS_X_WEIGHT', 6,  80);

--    PERFORM add_set(v_we_2, 0, 'NORMAL', 'REPS_X_WEIGHT', 12, 20);
--    PERFORM add_set(v_we_2, 1, 'NORMAL', 'REPS_X_WEIGHT', 10, 22);
--    PERFORM add_set(v_we_2, 2, 'NORMAL', 'REPS_X_WEIGHT', 8,  24);

END;
$$;
