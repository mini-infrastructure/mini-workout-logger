import type {WorkoutExercise} from "../WorkoutExercise/index.tsx";
import type {WorkoutExecution} from "../WorkoutExecution/index.tsx";

export interface Workout {
    id: number;
    name: string;
    workoutExercises: WorkoutExercise[];
    workoutExecutions: WorkoutExecution[];
}