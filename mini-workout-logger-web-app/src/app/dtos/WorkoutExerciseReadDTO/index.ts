import type {ExerciseReadDTO} from "../ExerciseReadDTO/index.ts";
import type {SetReadDTO} from "../SetReadDTO/index.ts";
import type {ExerciseEquipment} from "../../models/Exercise/index.tsx";

export interface WorkoutExerciseReadDTO {
    id: number;
    position: number;
    exercise: ExerciseReadDTO;
    sets: SetReadDTO[];
    equipment: ExerciseEquipment;
    rest_time_seconds: number;
    notes?: string;
}