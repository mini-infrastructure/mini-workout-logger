import type { WorkoutExerciseReadDTO } from '../dtos/workout-exercise-read.dto.tsx';
import type { WorkoutExerciseWriteDTO } from '../dtos/workout-exercise-write.dto.tsx';
import type { SetType } from '../models/set.model.tsx';

/**
 * Maps the current exercises state to the WorkoutExerciseWriteDTO[] shape
 * required by WorkoutService.update. Used by both WorkoutView and WorkoutExecutionView.
 */
export function buildWorkoutExercisesPayload(
    exercises: WorkoutExerciseReadDTO[]
): WorkoutExerciseWriteDTO[] {
    return exercises.map((we) => {
        const isCardio = we.exercise.category === 'CARDIO';
        return {
            exercise_id: we.exercise.id,
            sets: we.sets.map((s) => {
                // CARDIO exercises always use TIME regardless of the stored type,
                // because the UI only shows the time input for these exercises.
                const type = isCardio ? 'TIME' : s.type;
                return {
                    category: s.category,
                    type,
                    planned_repetitions:
                        type === 'TIME' || type === 'TIME_X_WEIGHT'
                            ? null
                            : (s.planned_repetitions ?? 0),
                    planned_weight:
                        type === 'REPS' || type === 'TIME'
                            ? null
                            : (s.planned_weight ?? 0),
                    planned_duration_seconds:
                        type === 'REPS' || type === 'REPS_X_WEIGHT'
                            ? null
                            : (s.planned_duration_seconds ?? 0),
                };
            }),
            equipment: we.equipment,
            rest_time_seconds: we.rest_time_seconds,
            ...(we.notes !== undefined ? { notes: we.notes } : {}),
        };
    });
}

/** Updates a single field on a specific set within an exercise. */
export function applySetChange(
    exercises: WorkoutExerciseReadDTO[],
    exerciseId: number,
    setId: number,
    field: string,
    value: number
): WorkoutExerciseReadDTO[] {
    return exercises.map((we) =>
        we.id !== exerciseId
            ? we
            : {
                  ...we,
                  sets: we.sets.map((s) =>
                      s.id === setId ? { ...s, [field]: value } : s
                  ),
              }
    );
}

/** Removes a set from an exercise. */
export function applySetRemove(
    exercises: WorkoutExerciseReadDTO[],
    exerciseId: number,
    setId: number
): WorkoutExerciseReadDTO[] {
    return exercises.map((we) =>
        we.id !== exerciseId
            ? we
            : { ...we, sets: we.sets.filter((s) => s.id !== setId) }
    );
}

/** Reorders a set within an exercise (drag-and-drop). */
export function applySetReorder(
    exercises: WorkoutExerciseReadDTO[],
    exerciseId: number,
    fromIndex: number,
    toIndex: number
): WorkoutExerciseReadDTO[] {
    return exercises.map((we) => {
        if (we.id !== exerciseId) return we;
        const sets = [...we.sets];
        const [moved] = sets.splice(fromIndex, 1);
        const adjusted = toIndex > fromIndex ? toIndex - 1 : toIndex;
        sets.splice(adjusted, 0, moved);
        return { ...we, sets };
    });
}

/**
 * Appends a new set to an exercise, copying the last set's values as defaults.
 * @param nullFallback - when true, weight and duration default to null instead
 *   of 0 (used in execution view where nullable fields are expected).
 */
export function applySetAdd(
    exercises: WorkoutExerciseReadDTO[],
    exerciseId: number,
    nullFallback = false,
    defaultType?: SetType
): WorkoutExerciseReadDTO[] {
    const fallback = nullFallback ? null : 0;
    return exercises.map((we) => {
        if (we.id !== exerciseId) return we;
        const last = we.sets[we.sets.length - 1];
        const type = defaultType ?? (last?.type ?? 'REPS') as SetType;
        const isTimeType = type === 'TIME' || type === 'TIME_X_WEIGHT';
        return {
            ...we,
            sets: [
                ...we.sets,
                {
                    id: -Date.now(),
                    position: we.sets.length,
                    category: last?.category ?? 'NORMAL',
                    type,
                    planned_repetitions: isTimeType ? 0 : (last?.planned_repetitions ?? 0),
                    planned_weight: last?.planned_weight ?? fallback,
                    planned_duration_seconds: isTimeType
                        ? (last?.planned_duration_seconds ?? fallback)
                        : fallback,
                },
            ],
        };
    });
}

/** Updates the notes field for an exercise. */
export function applyNotesChange(
    exercises: WorkoutExerciseReadDTO[],
    exerciseId: number,
    notes: string
): WorkoutExerciseReadDTO[] {
    return exercises.map((we) =>
        we.id !== exerciseId ? we : { ...we, notes }
    );
}
