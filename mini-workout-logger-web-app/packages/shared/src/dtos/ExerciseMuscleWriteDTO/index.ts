import type {ExerciseMuscleMovementClassification} from "../../models/Muscle";

export interface ExerciseMuscleWriteDTO {
    muscle_id: number;
    role: ExerciseMuscleMovementClassification;
}
