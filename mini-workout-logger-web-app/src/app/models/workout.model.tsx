import type {WorkoutExercise} from "./workout-exercise.model.tsx";
import type {WorkoutExecution} from "./workout-execution.model.tsx";

export interface Workout {
    id: number;
    name: string;
    workoutExercises: WorkoutExercise[];
    workoutExecutions: WorkoutExecution[];
}