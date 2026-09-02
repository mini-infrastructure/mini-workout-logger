import type {ExerciseMuscleMovementClassification} from "../../models/Muscle/index.tsx";

export interface ExerciseMuscleWriteDTO {
    muscle_id: number;
    role: ExerciseMuscleMovementClassification;
}
