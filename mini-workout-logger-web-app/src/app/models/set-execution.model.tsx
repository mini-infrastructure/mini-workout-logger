import type {Set} from "./set.model.tsx";
import type {WorkoutExerciseExecution} from "./workout-exercise-execution.model.tsx";

export interface SetExecution {
    id: number;
    set: Set;
    workoutExerciseExecution: WorkoutExerciseExecution;
    actualRepetitions: number;
    actualWeight: number;
    actualDurationSeconds: number;
    startTime: Date;
    endTime: Date;
    completed: boolean;
}