import type { ExerciseMuscleMovementClassification, Muscle } from '../Muscle/index';
import type { WorkoutExercise } from "../WorkoutExercise";
import type { IconType } from "react-icons";
import { FaBolt, FaFire, FaRunning, FaSeedling, FaWind } from "react-icons/fa";
import { MdTrendingUp, MdOutlineSportsGymnastics, MdShuffle } from "react-icons/md";
import { GiProgression, GiWeightLiftingUp, GiMedicalPack } from "react-icons/gi";
import type { ReactNode } from "react";
import { TbBallBasketball, TbBandage, TbJumpRope } from "react-icons/tb";
import type { ColorVariant } from "../../utils/colorsVariants";
import { BiBody, BiTargetLock } from "react-icons/bi";
import { GiRopeCoil } from "react-icons/gi";
import {
    BarbellIcon, DumbbellIcon, KettlebellIcon, MachineIcon, PlateIcon,
    StrechingIcon,
    PullIcon, PushIcon, RotateIcon,
} from '../../components/EquipmentIcons';

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
    | 'MOBILITY'
    | 'REHABILITATION'
    | 'POWER'
    | 'FUNCTIONAL'
    | 'WARM_UP'
    | 'RECOVERY'
    ;

export type EnergySystem =
    | 'AEROBIC'
    | 'ANAEROBIC'
    | 'MIXED'
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
    MOBILITY: MdOutlineSportsGymnastics,
    REHABILITATION: GiMedicalPack,
    POWER: GiWeightLiftingUp,
    FUNCTIONAL: BiTargetLock,
    WARM_UP: FaRunning,
    RECOVERY: TbBandage,
};

export const EnergySystemIcons: Record<EnergySystem, IconType> = {
    AEROBIC: FaWind,
    ANAEROBIC: FaBolt,
    MIXED: MdShuffle,
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
    MOBILITY: 'success',
    REHABILITATION: 'primary',
    POWER: 'orange',
    FUNCTIONAL: 'purple',
    WARM_UP: 'warning',
    RECOVERY: 'success',
};

export const EnergySystemVariants: Record<EnergySystem, ColorVariant> = {
    AEROBIC: 'success',
    ANAEROBIC: 'danger',
    MIXED: 'warning',
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
    const Icon: IconType | undefined = map[key];
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
    MOBILITY: 'Mobility',
    REHABILITATION: 'Rehabilitation',
    POWER: 'Power',
    FUNCTIONAL: 'Functional',
    WARM_UP: 'Warm Up',
    RECOVERY: 'Recovery',
};

const EnergySystemLabels: Record<EnergySystem, string> = {
    AEROBIC: 'Aerobic',
    ANAEROBIC: 'Anaerobic',
    MIXED: 'Mixed',
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

export const ExerciseForceIcons: Record<ExerciseForceDirection, IconType> = {
    PUSH: PushIcon as IconType,
    PULL: PullIcon as IconType,
    SLIDE: FaBolt,
    ROTATE_OR_TWIST: RotateIcon as IconType,
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
export const energySystemOptions = toOptions(EnergySystemLabels);
