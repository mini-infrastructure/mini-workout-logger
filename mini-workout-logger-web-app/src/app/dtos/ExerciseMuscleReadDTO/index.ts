import type {ExerciseMuscleMovementClassification} from "../../models/Muscle/index.tsx";

export interface ExerciseMuscleReadDTO {
    muscle_name: string;
    muscle_code?: string;
    role: ExerciseMuscleMovementClassification;
}
