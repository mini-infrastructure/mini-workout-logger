import type {Set, SetCategory, SetType} from "./set.model.tsx";
import type {WorkoutExerciseExecution} from "./workout-exercise-execution.model.tsx";

export interface SetExecution {
    id: number;
    set: Set;
    workoutExerciseExecution: WorkoutExerciseExecution;
    plannedRepetitions: number;
    plannedWeight: number;
    plannedDurationSeconds: number;
    plannedCategory: SetCategory;
    plannedType: SetType;
    actualRepetitions: number;
    actualWeight: number;
    actualDurationSeconds: number;
    skipped: boolean;
    startTime: string;
    endTime: string;
    completed: boolean;
}
