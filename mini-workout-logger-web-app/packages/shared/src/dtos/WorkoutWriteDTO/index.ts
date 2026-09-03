import type {WorkoutExerciseWriteDTO} from "../WorkoutExerciseWriteDTO";

export interface WorkoutWriteDTO {
    name: string;
    workout_exercises: WorkoutExerciseWriteDTO[];
    tag_ids?: number[];
}