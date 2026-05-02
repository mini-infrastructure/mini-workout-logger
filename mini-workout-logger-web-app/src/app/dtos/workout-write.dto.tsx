import type {WorkoutExerciseWriteDTO} from "./workout-exercise-write.dto.tsx";

export interface WorkoutWriteDTO {
    name: string;
    workout_exercises: WorkoutExerciseWriteDTO[];
    tag_ids?: number[];
}