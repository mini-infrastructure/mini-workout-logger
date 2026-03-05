import type {ExerciseCategory, ExerciseDifficulty} from "../models/exercise.model.tsx";
import type {MuscleReadDTO} from "./muscle-read.dto.tsx";

export interface ExerciseReadDTO {
    id: number;
    name: string;
    category?: ExerciseCategory;
    difficulty?: ExerciseDifficulty;
    muscles: MuscleReadDTO[];
    rootMuscles: string[];
}