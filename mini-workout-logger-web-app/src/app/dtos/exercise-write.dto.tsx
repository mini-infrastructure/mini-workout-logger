import type {
    ExerciseCategory,
    ExerciseDifficulty,
    ExerciseEquipment,
    ExerciseForceDirection,
    ExerciseMechanics,
    ExerciseRole,
    ExerciseType
} from "../models/exercise.model.tsx";
import type {ExerciseMuscleWriteDTO} from "./exercise-muscle-write.dto.tsx";

export interface ExerciseWriteDTO {
    name: string;
    category?: ExerciseCategory;
    difficulty?: ExerciseDifficulty;
    equipment?: ExerciseEquipment;
    force?: ExerciseForceDirection;
    mechanics?: ExerciseMechanics;
    role?: ExerciseRole;
    type?: ExerciseType;
    group_name?: string;
    exercise_muscles?: ExerciseMuscleWriteDTO[];
    hidden?: boolean;
}