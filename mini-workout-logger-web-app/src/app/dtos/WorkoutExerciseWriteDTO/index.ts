import type {SetWriteDTO} from "../SetWriteDTO/index.ts";
import type {ExerciseEquipment} from "../../models/Exercise/index.tsx";

export interface WorkoutExerciseWriteDTO {
    exercise_id: number;
    sets: SetWriteDTO[];
    equipment: ExerciseEquipment;
    rest_time_seconds: number;
    notes?: string;
}