import type {
    ExerciseCategory,
    ExerciseDifficulty,
    ExerciseEquipment,
    ExerciseForceDirection, ExerciseMechanics, ExerciseRole, ExerciseType
} from "../models/exercise.model.tsx";
import type {MuscleReadDTO} from "./muscle-read.dto.tsx";
import type {ExerciseMuscleReadDTO} from "./exercise-muscle-read.dto.tsx";
import type {MediaReadDTO} from "./media-read.dto.tsx";

export interface ExerciseReadDTO {
    id: number;
    name: string;
    category?: ExerciseCategory;
    difficulty?: ExerciseDifficulty;
    equipment?: ExerciseEquipment;
    force?: ExerciseForceDirection;
    mechanics?: ExerciseMechanics;
    role?: ExerciseRole;
    type?: ExerciseType;
    group_name?: string;
    exercise_muscles?: ExerciseMuscleReadDTO[];
    muscles?: MuscleReadDTO[];
    target_muscles?: MuscleReadDTO[];
    synergist_muscles?: MuscleReadDTO[];
    stabilizer_muscles?: MuscleReadDTO[];
    root_muscles?: string[];
    favorited?: boolean;
    hidden?: boolean;
    media?: MediaReadDTO[];
}