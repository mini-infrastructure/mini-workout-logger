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
    return exercises.map((we) => ({
        exercise_id: we.exercise.id,
        sets: we.sets.map((s) => ({
            category: s.category,
            type: s.type,
            planned_repetitions:
                s.type === 'TIME' || s.type === 'TIME_X_WEIGHT'
                    ? null
                    : (s.planned_repetitions ?? 0),
            planned_weight:
                s.type === 'REPS' || s.type === 'TIME'
                    ? null
                    : (s.planned_weight ?? 0),
            planned_duration_seconds:
                s.type === 'REPS' || s.type === 'REPS_X_WEIGHT'
                    ? null
                    : (s.planned_duration_seconds ?? 0),
        })),
        equipment: we.equipment,
        rest_time_seconds: we.rest_time_seconds,
        ...(we.notes !== undefined ? { notes: we.notes } : {}),
    }));
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
    nullFallback = false
): WorkoutExerciseReadDTO[] {
    const fallback = nullFallback ? null : 0;
    return exercises.map((we) => {
        if (we.id !== exerciseId) return we;
        const last = we.sets[we.sets.length - 1];
        return {
            ...we,
            sets: [
                ...we.sets,
                {
                    id: -Date.now(),
                    position: we.sets.length,
                    category: last?.category ?? 'NORMAL',
                    type: (last?.type ?? 'REPS') as SetType,
                    planned_repetitions: last?.planned_repetitions ?? 0,
                    planned_weight: last?.planned_weight ?? fallback,
                    planned_duration_seconds:
                        last?.planned_duration_seconds ?? fallback,
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
