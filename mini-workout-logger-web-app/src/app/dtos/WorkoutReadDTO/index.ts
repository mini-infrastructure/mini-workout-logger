import type {WorkoutExerciseReadDTO} from "../WorkoutExerciseReadDTO/index.ts";
import type {TagReadDTO} from "../TagReadDTO/index.ts";

export interface WorkoutReadDTO {
    id: number;
    name: string;
    workout_exercises: WorkoutExerciseReadDTO[];
    tags?: TagReadDTO[];
}