import type {Set, SetCategory, SetType} from "../Set";
import type {WorkoutExerciseExecution} from "../WorkoutExerciseExecution";

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
