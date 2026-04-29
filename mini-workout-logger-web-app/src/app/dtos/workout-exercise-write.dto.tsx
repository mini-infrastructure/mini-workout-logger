import type {SetWriteDTO} from "./set-write.dto.tsx";
import type {ExerciseEquipment} from "../models/workout-exercise.model.tsx";

export interface WorkoutExerciseWriteDTO {
    exercise_id: number;
    sets: SetWriteDTO[];
    equipment: ExerciseEquipment;
    rest_time_seconds: number;
    notes?: string;
}