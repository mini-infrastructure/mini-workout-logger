import type {ExerciseCategory, ExerciseDifficulty} from "../models/exercise.model.tsx";

export interface ExerciseWriteDTO {
    name: string;
    category?: ExerciseCategory;
    difficulty?: ExerciseDifficulty;
    muscle_ids: number[];
}