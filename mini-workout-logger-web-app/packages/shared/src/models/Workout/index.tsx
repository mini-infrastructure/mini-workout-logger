import type {WorkoutExercise} from "../WorkoutExercise";
import type {WorkoutExecution} from "../WorkoutExecution";

export interface Workout {
    id: number;
    name: string;
    workoutExercises: WorkoutExercise[];
    workoutExecutions: WorkoutExecution[];
}