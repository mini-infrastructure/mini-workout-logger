import type {ExerciseMuscleMovementClassification} from "../../models/Muscle";

export interface ExerciseMuscleReadDTO {
    muscle_name: string;
    muscle_code?: string;
    role: ExerciseMuscleMovementClassification;
}
