import type {Workout} from "../Workout/index.tsx";
import type {WorkoutExerciseExecution} from "../WorkoutExerciseExecution/index.tsx";

export interface WorkoutExecution {
    id: number;
    workout: Workout;
    startTime: string;
    endTime: string;
    completed: boolean;
    workoutExerciseExecutions: WorkoutExerciseExecution[];
}
