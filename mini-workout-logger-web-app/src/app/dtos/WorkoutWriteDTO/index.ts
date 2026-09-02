import type {WorkoutExerciseWriteDTO} from "../WorkoutExerciseWriteDTO/index.ts";

export interface WorkoutWriteDTO {
    name: string;
    workout_exercises: WorkoutExerciseWriteDTO[];
    tag_ids?: number[];
}