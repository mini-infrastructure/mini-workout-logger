import type {ExerciseReadDTO} from "./exercise-read.dto.tsx";
import type {SetReadDTO} from "./set-read.dto.tsx";
import type {ExerciseEquipment} from "../models/exercise.model.tsx";

export interface WorkoutExerciseReadDTO {
    id: number;
    position: number;
    exercise: ExerciseReadDTO;
    sets: SetReadDTO[];
    equipment: ExerciseEquipment;
    rest_time_seconds: number;
    notes?: string;
}