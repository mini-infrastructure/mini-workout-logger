import type {
    ExerciseCategory,
    ExerciseDifficulty,
    ExerciseEquipment,
    ExerciseForceDirection, ExerciseMechanics, ExerciseRole, ExerciseType
} from "../models/exercise.model.tsx";
import type {MuscleReadDTO} from "./muscle-read.dto.tsx";
import type {ExerciseMuscleWriteDTO} from "./exercise-muscle-write.dto.tsx";

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
    groupName?: string;
    exercise_muscles?: ExerciseMuscleWriteDTO[];
    muscles?: MuscleReadDTO[];
    targetMuscles?: MuscleReadDTO[];
    synergistMuscles?: MuscleReadDTO[];
    stabilizerMuscles?: MuscleReadDTO[];
    rootMuscles?: string[];
}