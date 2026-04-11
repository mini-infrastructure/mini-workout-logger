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
        rest_time_seconds,
        created_at,
        updated_at
    )
    VALUES (
        p_workout_id,
        v_exercise_id,
        p_position,
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
        planned_repetitions,
        planned_weight,
        planned_duration_seconds,
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
    v_we_3 BIGINT;
    v_we_4 BIGINT;
BEGIN

    ------------------------------------------------------------------
    -- WORKOUT 1: Treino Superiores
    ------------------------------------------------------------------
    v_workout_id := add_workout('Treino Superiores');

    -- 1. Cable Isolateral Bench Press
    v_we_1 := add_workout_exercise(v_workout_id, 'Exercise.Cable_Isolateral_Bench_Press', 0, 90);
    PERFORM add_set(v_we_1, 0, 'WARMUP', 'REPS_X_WEIGHT', 15, 30);
    PERFORM add_set(v_we_1, 1, 'NORMAL', 'REPS_X_WEIGHT', 10, 60);
    PERFORM add_set(v_we_1, 2, 'NORMAL', 'REPS_X_WEIGHT',  8, 70);
    PERFORM add_set(v_we_1, 3, 'NORMAL', 'REPS_X_WEIGHT',  6, 80);

    -- 2. Cable Isolateral Standing Fly
    v_we_2 := add_workout_exercise(v_workout_id, 'Exercise.Cable_Isolateral_Standing_Fly', 1, 60);
    PERFORM add_set(v_we_2, 0, 'WARMUP', 'REPS_X_WEIGHT', 15, 20);
    PERFORM add_set(v_we_2, 1, 'NORMAL', 'REPS_X_WEIGHT', 12, 30);
    PERFORM add_set(v_we_2, 2, 'NORMAL', 'REPS_X_WEIGHT', 10, 35);

    -- 3. Barbell Military Press
    v_we_3 := add_workout_exercise(v_workout_id, 'Exercise.Barbell_Military_Press', 2, 90);
    PERFORM add_set(v_we_3, 0, 'WARMUP', 'REPS_X_WEIGHT', 15, 20);
    PERFORM add_set(v_we_3, 1, 'NORMAL', 'REPS_X_WEIGHT',  8, 50);
    PERFORM add_set(v_we_3, 2, 'NORMAL', 'REPS_X_WEIGHT',  8, 50);
    PERFORM add_set(v_we_3, 3, 'NORMAL', 'REPS_X_WEIGHT',  6, 55);

    -- 4. Barbell Curl
    v_we_4 := add_workout_exercise(v_workout_id, 'Exercise.Barbell_Curl', 3, 60);
    PERFORM add_set(v_we_4, 0, 'NORMAL', 'REPS_X_WEIGHT', 12, 30);
    PERFORM add_set(v_we_4, 1, 'NORMAL', 'REPS_X_WEIGHT', 10, 35);
    PERFORM add_set(v_we_4, 2, 'NORMAL', 'REPS_X_WEIGHT',  8, 40);

    ------------------------------------------------------------------
    -- WORKOUT 2: Treino Inferiores
    ------------------------------------------------------------------
    v_workout_id := add_workout('Treino Inferiores');

    -- 1. Barbell Squat
    v_we_1 := add_workout_exercise(v_workout_id, 'Exercise.Barbell_Squat', 0, 120);
    PERFORM add_set(v_we_1, 0, 'WARMUP', 'REPS_X_WEIGHT', 15,  60);
    PERFORM add_set(v_we_1, 1, 'NORMAL', 'REPS_X_WEIGHT', 10, 100);
    PERFORM add_set(v_we_1, 2, 'NORMAL', 'REPS_X_WEIGHT',  8, 110);
    PERFORM add_set(v_we_1, 3, 'NORMAL', 'REPS_X_WEIGHT',  6, 120);

    -- 2. Machine Leg Press 45°
    v_we_2 := add_workout_exercise(v_workout_id, 'Exercise.Machine_Leg_Press_45_Degree', 1, 90);
    PERFORM add_set(v_we_2, 0, 'WARMUP', 'REPS_X_WEIGHT', 15,  80);
    PERFORM add_set(v_we_2, 1, 'NORMAL', 'REPS_X_WEIGHT', 12, 120);
    PERFORM add_set(v_we_2, 2, 'NORMAL', 'REPS_X_WEIGHT', 10, 140);
    PERFORM add_set(v_we_2, 3, 'NORMAL', 'REPS_X_WEIGHT',  8, 160);

    -- 3. Dumbbell Forward Lunge
    v_we_3 := add_workout_exercise(v_workout_id, 'Exercise.Dumbbell_Forward_Lunge', 2, 60);
    PERFORM add_set(v_we_3, 0, 'NORMAL', 'REPS_X_WEIGHT', 12, 20);
    PERFORM add_set(v_we_3, 1, 'NORMAL', 'REPS_X_WEIGHT', 10, 25);
    PERFORM add_set(v_we_3, 2, 'NORMAL', 'REPS_X_WEIGHT', 10, 25);

    -- 4. Barbell Standing Calf Raise
    v_we_4 := add_workout_exercise(v_workout_id, 'Exercise.Barbell_Standing_Leg_Calf_Raise', 3, 60);
    PERFORM add_set(v_we_4, 0, 'NORMAL', 'REPS_X_WEIGHT', 15, 60);
    PERFORM add_set(v_we_4, 1, 'NORMAL', 'REPS_X_WEIGHT', 15, 60);
    PERFORM add_set(v_we_4, 2, 'NORMAL', 'REPS_X_WEIGHT', 12, 70);

END;
$$;
