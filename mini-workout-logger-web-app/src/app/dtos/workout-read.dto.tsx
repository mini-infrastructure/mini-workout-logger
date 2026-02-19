import type {WorkoutExerciseReadDTO} from "./workout-exercise-read.dto.tsx";

export interface WorkoutReadDTO {
    id: number;
    name: string;
    workout_exercises: WorkoutExerciseReadDTO[]
}