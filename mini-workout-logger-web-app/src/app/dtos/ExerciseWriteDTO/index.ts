import type {
    ExerciseCategory,
    ExerciseDifficulty,
    ExerciseEquipment,
    ExerciseForceDirection, ExerciseMechanics, ExerciseRole, ExerciseType
} from "../../models/Exercise/index.tsx";
import type {ExerciseMuscleWriteDTO} from "../ExerciseMuscleWriteDTO/index.ts";

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