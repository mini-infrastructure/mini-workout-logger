import type {WorkoutExercise} from "./workout-exercise.model.tsx";
import type {SetExecution} from "./set-execution.model.tsx";

export interface Set {
    id: number;
    workoutExercise: WorkoutExercise;
    position: number;
    setExecutions: SetExecution[];
    category: SetCategory;
    type: SetType;
    repetitions: number;
    weight: number;
    durationSeconds: number;
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