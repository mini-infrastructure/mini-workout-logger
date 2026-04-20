import type {ExerciseMuscleMovementClassification} from "../models/muscle.model.tsx";

export interface ExerciseMuscleReadDTO {
    muscle_name: string;
    muscle_code?: string;
    role: ExerciseMuscleMovementClassification;
}
