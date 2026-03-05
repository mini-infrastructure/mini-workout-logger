import type {ExerciseCategory, ExerciseDifficulty, ExerciseEquipment} from "../models/exercise.model.tsx";
import type {MuscleReadDTO} from "./muscle-read.dto.tsx";

export interface ExerciseReadDTO {
    id: number;
    name: string;
    category?: ExerciseCategory;
    difficulty?: ExerciseDifficulty;
    equipments?: ExerciseEquipment[];
    muscles: MuscleReadDTO[];
    rootMuscles: string[];
}