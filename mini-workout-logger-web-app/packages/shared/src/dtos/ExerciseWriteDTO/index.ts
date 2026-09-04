import type {
    EnergySystem,
    ExerciseCategory,
    ExerciseDifficulty,
    ExerciseEquipment,
    ExerciseForceDirection, ExerciseMechanics, ExerciseRole, ExerciseType
} from "../../models/Exercise";
import type {ExerciseMuscleWriteDTO} from "../ExerciseMuscleWriteDTO";

export interface ExerciseWriteDTO {
    name: string;
    category?: ExerciseCategory;
    difficulty?: ExerciseDifficulty;
    equipment?: ExerciseEquipment;
    force?: ExerciseForceDirection;
    mechanics?: ExerciseMechanics;
    role?: ExerciseRole;
    type?: ExerciseType;
    energy_system?: EnergySystem;
    group_name?: string;
    exercise_muscles?: ExerciseMuscleWriteDTO[];
    hidden?: boolean;
}