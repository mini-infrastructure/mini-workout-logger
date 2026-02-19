import type {WorkoutExecution} from "./workout-execution.model.tsx";
import type {WorkoutExercise} from "./workout-exercise.model.tsx";
import type {SetExecution} from "./set-execution.model.tsx";

export interface WorkoutExerciseExecution {
    id: number;
    workoutExecution: WorkoutExecution;
    workoutExercise: WorkoutExercise;
    setExecutions: SetExecution[];
    startTime: Date;
    endTime: Date;
    completed: boolean;
}