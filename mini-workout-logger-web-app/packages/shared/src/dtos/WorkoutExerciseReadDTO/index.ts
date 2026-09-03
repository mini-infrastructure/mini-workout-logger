import type {ExerciseReadDTO} from "../ExerciseReadDTO";
import type {SetReadDTO} from "../SetReadDTO";
import type {ExerciseEquipment} from "../../models/Exercise";

export interface WorkoutExerciseReadDTO {
    id: number;
    position: number;
    exercise: ExerciseReadDTO;
    sets: SetReadDTO[];
    equipment: ExerciseEquipment;
    rest_time_seconds: number;
    notes?: string;
}