import type {SetWriteDTO} from "../SetWriteDTO";
import type {ExerciseEquipment} from "../../models/Exercise";

export interface WorkoutExerciseWriteDTO {
    exercise_id: number;
    sets: SetWriteDTO[];
    equipment: ExerciseEquipment;
    rest_time_seconds: number;
    notes?: string;
}