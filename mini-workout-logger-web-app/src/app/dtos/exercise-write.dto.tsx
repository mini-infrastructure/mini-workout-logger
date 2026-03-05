import type {ExerciseCategory, ExerciseDifficulty, ExerciseEquipment} from "../models/exercise.model.tsx";

export interface ExerciseWriteDTO {
    name: string;
    category?: ExerciseCategory;
    difficulty?: ExerciseDifficulty;
    equipments?: ExerciseEquipment[];
    muscle_ids: number[];
}