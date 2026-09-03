import type {WorkoutExerciseReadDTO} from "../WorkoutExerciseReadDTO";
import type {TagReadDTO} from "../TagReadDTO";

export interface WorkoutReadDTO {
    id: number;
    name: string;
    workout_exercises: WorkoutExerciseReadDTO[];
    tags?: TagReadDTO[];
}