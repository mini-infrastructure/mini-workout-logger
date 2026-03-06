import {Muscle} from './muscle.model';
import type {WorkoutExercise} from "./workout-exercise.model.tsx";
import type {IconType} from "react-icons";
import {FaBolt, FaDumbbell, FaFire, FaRunning, FaSeedling} from "react-icons/fa";
import {MdFitnessCenter, MdSelfImprovement, MdTrendingUp} from "react-icons/md";
import {GiMuscleUp, GiProgression, GiWeight, GiWeightLiftingUp} from "react-icons/gi";
import type {ReactNode} from "react";
import {TbBallBasketball, TbBandage, TbBarbell} from "react-icons/tb";
import type {ColorVariant} from "../utils/colorsVariants.tsx";

export interface Exercise {
    id: number;
    name: string;
    category?: ExerciseCategory;
    difficulty?: ExerciseDifficulty;
    equipments?: ExerciseEquipment[];
    muscles?: Muscle[];
    workoutExercises: WorkoutExercise[];
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

export const ExerciseCategoryIcons: Record<ExerciseCategory, IconType> = {
    STRENGTH: FaDumbbell,
    CARDIO: FaRunning,
    STRETCHING: MdSelfImprovement,
    POWERLIFTING: GiWeightLiftingUp,
    OLYMPIC_WEIGHTLIFTING: GiWeightLiftingUp,
    STRONGMAN: GiMuscleUp,
    CALISTHENICS: GiMuscleUp,
    PLYOMETRICS: FaBolt,
    RECOVERY: MdSelfImprovement,
    HIT: FaFire,
    MOBILITY: MdSelfImprovement,
    PILATES: MdSelfImprovement,
    YOGA: MdSelfImprovement,
    WARM_UP: FaBolt,
};

export const ExerciseDifficultyIcons: Record<ExerciseDifficulty, IconType> = {
    NOVICE: FaSeedling,
    BEGINNER: GiProgression,
    INTERMEDIATE: MdTrendingUp,
    ADVANCED: FaFire,
};

export const ExerciseEquipmentIcons: Record<ExerciseEquipment, IconType> = {
    BARBELL: TbBarbell,
    DUMBBELL: FaDumbbell,
    BODYWEIGHT: MdFitnessCenter,
    BOSU_BALL: TbBallBasketball,
    CABLE: MdFitnessCenter,
    EXERCISE_BALL: TbBallBasketball,
    MACHINE: MdFitnessCenter,
    SMITH_MACHINE: MdFitnessCenter,
    MEDICINE_BALL: TbBallBasketball,
    PLATE: GiWeightLiftingUp,
    RESISTANCE_BAND: TbBandage,
    TRX: MdFitnessCenter,
    KETTLEBELL: GiWeight,
};

export const ExerciseDifficultyVariants: Record<
    ExerciseDifficulty,
    ColorVariant
> = {
    NOVICE: "success",
    BEGINNER: "success",
    INTERMEDIATE: "warning",
    ADVANCED: "danger",
};

export const ExerciseEquipmentVariants: Record<
    ExerciseEquipment,
    ColorVariant
> = {
    BARBELL: "gray",
    DUMBBELL: "gray",
    BODYWEIGHT: "success",
    BOSU_BALL: "warning",
    CABLE: "gray",
    EXERCISE_BALL: "warning",
    MACHINE: "gray",
    SMITH_MACHINE: "gray",
    MEDICINE_BALL: "warning",
    PLATE: "gray",
    RESISTANCE_BAND: "success",
    TRX: "warning",
    KETTLEBELL: "gray",
};

export function getIconFromMap<T extends string>(
    map: Record<T, IconType>,
    key?: T,
    size = 14
): ReactNode {
    if (!key) return undefined;

    const Icon = map[key];
    return Icon ? <Icon size={size} /> : undefined;
}

export function getExerciseDifficultyVariant(
    difficulty?: ExerciseDifficulty,
): ColorVariant | undefined {
    if (!difficulty) return undefined;

    return ExerciseDifficultyVariants[difficulty];
}

export function getExerciseEquipmentVariant(
    equipment?: ExerciseEquipment,
): ColorVariant | undefined {
    if (!equipment) return undefined;

    return ExerciseEquipmentVariants[equipment];
}

export const exerciseCategoryOptions = [
    { label: "Strength", value: "STRENGTH" },
    { label: "Cardio", value: "CARDIO" },
    { label: "Stretching", value: "STRETCHING" },
    { label: "Powerlifting", value: "POWERLIFTING" },
    { label: "Olympic Weightlifting", value: "OLYMPIC_WEIGHTLIFTING" },
    { label: "Strongman", value: "STRONGMAN" },
    { label: "Calisthenics", value: "CALISTHENICS" },
    { label: "Plyometrics", value: "PLYOMETRICS" },
    { label: "Recovery", value: "RECOVERY" },
    { label: "HIT", value: "HIT" },
    { label: "Mobility", value: "MOBILITY" },
    { label: "Pilates", value: "PILATES" },
    { label: "Yoga", value: "YOGA" },
    { label: "Warm Up", value: "WARM_UP" },
];

export const exerciseDifficultyOptions = [
    { label: "Novice", value: "NOVICE" },
    { label: "Beginner", value: "BEGINNER" },
    { label: "Intermediate", value: "INTERMEDIATE" },
    { label: "Advanced", value: "ADVANCED" },
];

export const exerciseEquipmentOptions = [
    { label: "Barbell", value: "BARBELL" },
    { label: "Dumbbell", value: "DUMBBELL" },
    { label: "Bodyweight", value: "BODYWEIGHT" },
    { label: "BOSU Ball", value: "BOSU_BALL" },
    { label: "Cable", value: "CABLE" },
    { label: "Exercise Ball", value: "EXERCISE_BALL" },
    { label: "Machine", value: "MACHINE" },
    { label: "Smith Machine", value: "SMITH_MACHINE" },
    { label: "Medicine Ball", value: "MEDICINE_BALL" },
    { label: "Plate", value: "PLATE" },
    { label: "Resistance Band", value: "RESISTANCE_BAND" },
    { label: "TRX", value: "TRX" },
    { label: "Kettlebell", value: "KETTLEBELL" },
];

