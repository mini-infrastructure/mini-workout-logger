import type {Workout} from "./workout.model.tsx";
import type {WorkoutExerciseExecution} from "./workout-exercise-execution.model.tsx";

export interface WorkoutExecution {
    id: number;
    workout: Workout;
    startTime: string;
    endTime: string;
    completed: boolean;
    workoutExerciseExecutions: WorkoutExerciseExecution[];
}
