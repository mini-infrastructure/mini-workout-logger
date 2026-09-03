import type {WorkoutExercise} from "../WorkoutExercise";
import type {SetExecution} from "../SetExecution";

export interface Set {
    id: number;
    workoutExercise: WorkoutExercise;
    position: number;
    setExecutions: SetExecution[];
    category: SetCategory;
    type: SetType;
    plannedRepetitions: number;
    plannedWeight: number;
    plannedDurationSeconds: number;
}

export type SetCategory =
    | 'NORMAL'
    | 'WARMUP'
    | 'COMPOUND'
    ;

export type SetType =
    | 'REPS'
    | 'REPS_X_WEIGHT'
    | 'TIME_X_WEIGHT'
    | 'TIME'
    ;