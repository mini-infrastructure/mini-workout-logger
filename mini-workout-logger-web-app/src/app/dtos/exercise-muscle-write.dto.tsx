import type {ExerciseMuscleMovementClassification} from "../models/muscle.model.tsx";

export interface ExerciseMuscleWriteDTO {
    muscle_id: number;
    role: ExerciseMuscleMovementClassification;
}
