import { ExerciseMuscleMovementClassification, Muscle } from './muscle.model';
import type { WorkoutExercise } from "./workout-exercise.model.tsx";
import type { IconType } from "react-icons";
import { FaBolt, FaDotCircle, FaFire, FaRunning, FaSeedling } from "react-icons/fa";
import { MdFitnessCenter, MdSelfImprovement, MdTrendingUp } from "react-icons/md";
import { GiBodyBalance, GiMuscleUp, GiProgression, GiWeightLiftingUp } from "react-icons/gi";
import type { ReactNode } from "react";
import { TbBallBasketball, TbBandage, TbJumpRope, TbYoga } from "react-icons/tb";
import type { ColorVariant } from "../utils/colorsVariants.tsx";
import { LiaDumbbellSolid } from "react-icons/lia";
import { BiBody } from "react-icons/bi";
import { RiWeightFill } from "react-icons/ri";
import { GrYoga } from "react-icons/gr";
import { MdOutlineSportsGymnastics } from "react-icons/md";
import { GiRopeCoil } from "react-icons/gi";
import { BarbellIcon, DumbbellIcon, KettlebellIcon, MachineIcon, PlateIcon } from '../components/icons/equipment-icons.tsx';

export interface Exercise {
    id: number;
    name: string;
    favorited?: boolean;
    category?: ExerciseCategory;
    difficulty?: ExerciseDifficulty;
    equipment?: ExerciseEquipment;
    force?: ExerciseForceDirection;
    mechanics?: ExerciseMechanics;
    role?: ExerciseRole;
    type?: ExerciseType;
    group?: ExerciseGroup;
    workoutExercises?: WorkoutExercise[];
    exerciseMuscles?: ExerciseMuscle[];
}

export interface ExerciseGroup {
    id: number;
    name: string;
}

export interface ExerciseMuscle {
    id: number;
    exercise: Exercise;
    muscle: Muscle;
    role: ExerciseMuscleMovementClassification;
}

export type ExerciseEquipment =
    | 'BARBELL'
    | 'DUMBBELL'
    | 'BODYWEIGHT'
    | 'BOSU_BALL'
    | 'CABLE'
    | 'EXERCISE_BALL'
    | 'MACHINE'
    | 'SMITH_MACHINE'
    | 'MEDICINE_BALL'
    | 'PLATE'
    | 'RESISTANCE_BAND'
    | 'TRX'
    | 'KETTLEBELL'
    ;

export type ExerciseCategory =
    | 'STRENGTH'
    | 'CARDIO'
    | 'STRETCHING'
    | 'POWERLIFTING'
    | 'OLYMPIC_WEIGHTLIFTING'
    | 'STRONGMAN'
    | 'CALISTHENICS'
    | 'PLYOMETRICS'
    | 'RECOVERY'
    | 'HIT'
    | 'MOBILITY'
    | 'PILATES'
    | 'YOGA'
    | 'WARM_UP'
    ;

export type ExerciseDifficulty =
    | 'NOVICE'
    | 'BEGINNER'
    | 'INTERMEDIATE'
    | 'ADVANCED'
    ;

export type ExerciseForceDirection =
    | 'PUSH'
    | 'PULL'
    | 'SLIDE'
    | 'ROTATE_OR_TWIST'
    ;

export type ExerciseMechanics =
    | 'ISOLATED'
    | 'COMPOUND'
    ;

export type ExerciseRole =
    | 'BASIC'
    | 'AUXILIARY'
    | 'BASIC_OR_AUXILIARY'
    ;

export type ExerciseType =
    | 'BILATERAL'
    | 'ISOLATERAL'
    | 'UNILATERAL'
    ;

// --- Icons ---

export const ExerciseCategoryIcons: Record<ExerciseCategory, IconType> = {
    STRENGTH: FaFire,
    CARDIO: FaRunning,
    STRETCHING: MdSelfImprovement,
    POWERLIFTING: GiWeightLiftingUp,
    OLYMPIC_WEIGHTLIFTING: RiWeightFill,
    STRONGMAN: GiMuscleUp,
    CALISTHENICS: GiBodyBalance,
    PLYOMETRICS: FaBolt,
    RECOVERY: TbBandage,
    HIT: FaFire,
    MOBILITY: MdOutlineSportsGymnastics,
    PILATES: TbYoga,
    YOGA: GrYoga,
    WARM_UP: FaRunning,
};

export const ExerciseDifficultyIcons: Record<ExerciseDifficulty, IconType> = {
    NOVICE: FaSeedling,
    BEGINNER: GiProgression,
    INTERMEDIATE: MdTrendingUp,
    ADVANCED: FaFire,
};

export const ExerciseEquipmentIcons: Record<ExerciseEquipment, IconType> = {
    BARBELL: BarbellIcon as IconType,
    DUMBBELL: DumbbellIcon as IconType,
    BODYWEIGHT: BiBody,
    BOSU_BALL: TbBallBasketball,
    CABLE: GiRopeCoil,
    EXERCISE_BALL: TbBallBasketball,
    MACHINE: MachineIcon as IconType,
    SMITH_MACHINE: GiWeightLiftingUp,
    MEDICINE_BALL: TbBallBasketball,
    PLATE: PlateIcon as IconType,
    RESISTANCE_BAND: TbBandage,
    TRX: TbJumpRope,
    KETTLEBELL: KettlebellIcon as IconType,
};

// --- Color variants ---

export const ExerciseCategoryVariants: Record<ExerciseCategory, ColorVariant> = {
    STRENGTH: 'danger',
    CARDIO: 'warning',
    STRETCHING: 'success',
    POWERLIFTING: 'orange',
    OLYMPIC_WEIGHTLIFTING: 'orange',
    STRONGMAN: 'danger',
    CALISTHENICS: 'primary',
    PLYOMETRICS: 'warning',
    RECOVERY: 'success',
    HIT: 'danger',
    MOBILITY: 'success',
    PILATES: 'pink',
    YOGA: 'purple',
    WARM_UP: 'warning',
};

export const ExerciseDifficultyVariants: Record<ExerciseDifficulty, ColorVariant> = {
    NOVICE: 'success',
    BEGINNER: 'success',
    INTERMEDIATE: 'warning',
    ADVANCED: 'danger',
};

export const ExerciseEquipmentVariants: Record<ExerciseEquipment, ColorVariant> = {
    BARBELL: 'gray',
    DUMBBELL: 'gray',
    BODYWEIGHT: 'success',
    BOSU_BALL: 'warning',
    CABLE: 'gray',
    EXERCISE_BALL: 'warning',
    MACHINE: 'gray',
    SMITH_MACHINE: 'gray',
    MEDICINE_BALL: 'warning',
    PLATE: 'gray',
    RESISTANCE_BAND: 'success',
    TRX: 'warning',
    KETTLEBELL: 'gray',
};

// --- Generic helpers ---

export function getIconFromMap<T extends string>(
    map: Record<T, IconType>,
    key?: T,
    size = 14
): ReactNode {
    if (!key) return undefined;
    const Icon = map[key];
    return Icon ? <Icon size={size} /> : undefined;
}

export function getVariantFromMap<T extends string>(
    map: Record<T, ColorVariant>,
    key?: T,
): ColorVariant | undefined {
    if (!key) return undefined;
    return map[key];
}

// --- Select options (derived from type records to stay in sync) ---

const ExerciseCategoryLabels: Record<ExerciseCategory, string> = {
    STRENGTH: 'Strength',
    CARDIO: 'Cardio',
    STRETCHING: 'Stretching',
    POWERLIFTING: 'Powerlifting',
    OLYMPIC_WEIGHTLIFTING: 'Olympic Weightlifting',
    STRONGMAN: 'Strongman',
    CALISTHENICS: 'Calisthenics',
    PLYOMETRICS: 'Plyometrics',
    RECOVERY: 'Recovery',
    HIT: 'HIT',
    MOBILITY: 'Mobility',
    PILATES: 'Pilates',
    YOGA: 'Yoga',
    WARM_UP: 'Warm Up',
};

const ExerciseDifficultyLabels: Record<ExerciseDifficulty, string> = {
    NOVICE: 'Novice',
    BEGINNER: 'Beginner',
    INTERMEDIATE: 'Intermediate',
    ADVANCED: 'Advanced',
};

const ExerciseEquipmentLabels: Record<ExerciseEquipment, string> = {
    BARBELL: 'Barbell',
    DUMBBELL: 'Dumbbell',
    BODYWEIGHT: 'Bodyweight',
    BOSU_BALL: 'BOSU Ball',
    CABLE: 'Cable',
    EXERCISE_BALL: 'Exercise Ball',
    MACHINE: 'Machine',
    SMITH_MACHINE: 'Smith Machine',
    MEDICINE_BALL: 'Medicine Ball',
    PLATE: 'Plate',
    RESISTANCE_BAND: 'Resistance Band',
    TRX: 'TRX',
    KETTLEBELL: 'Kettlebell',
};

const ExerciseForceLabels: Record<ExerciseForceDirection, string> = {
    PUSH: 'Push',
    PULL: 'Pull',
    SLIDE: 'Slide',
    ROTATE_OR_TWIST: 'Rotate or Twist',
};

const ExerciseMechanicsLabels: Record<ExerciseMechanics, string> = {
    ISOLATED: 'Isolated',
    COMPOUND: 'Compound',
};

const ExerciseRoleLabels: Record<ExerciseRole, string> = {
    BASIC: 'Basic',
    AUXILIARY: 'Auxiliary',
    BASIC_OR_AUXILIARY: 'Basic or Auxiliary',
};

const ExerciseTypeLabels: Record<ExerciseType, string> = {
    BILATERAL: 'Bilateral',
    ISOLATERAL: 'Isolateral',
    UNILATERAL: 'Unilateral',
};

const ExerciseMuscleMovementLabels: Record<ExerciseMuscleMovementClassification, string> = {
    AGONIST: 'Agonist',
    ANTAGONIST: 'Antagonist',
    TARGET: 'Target',
    SYNERGIST: 'Synergist',
    STABILIZER: 'Stabilizer',
    DYNAMIC_STABILIZER: 'Dynamic Stabilizer',
    ANTAGONIST_STABILIZER: 'Antagonist Stabilizer',
};

function toOptions<T extends string>(labels: Record<T, string>) {
    return (Object.keys(labels) as T[]).map(value => ({ label: labels[value], value }));
}

export const exerciseCategoryOptions = toOptions(ExerciseCategoryLabels);
export const exerciseDifficultyOptions = toOptions(ExerciseDifficultyLabels);
export const exerciseEquipmentOptions = toOptions(ExerciseEquipmentLabels);
export const exerciseForceOptions = toOptions(ExerciseForceLabels);
export const exerciseMechanicsOptions = toOptions(ExerciseMechanicsLabels);
export const exerciseRoleOptions = toOptions(ExerciseRoleLabels);
export const exerciseTypeOptions = toOptions(ExerciseTypeLabels);
export const exerciseMuscleMovementClassificationOptions = toOptions(ExerciseMuscleMovementLabels);
