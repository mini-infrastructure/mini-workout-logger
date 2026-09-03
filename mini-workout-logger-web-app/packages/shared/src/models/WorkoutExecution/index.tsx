import type {Workout} from "../Workout";
import type {WorkoutExerciseExecution} from "../WorkoutExerciseExecution";

export interface WorkoutExecution {
    id: number;
    workout: Workout;
    startTime: string;
    endTime: string;
    completed: boolean;
    workoutExerciseExecutions: WorkoutExerciseExecution[];
}
