import {Muscle} from './muscle.model';
import type {WorkoutExercise} from "./workout-exercise.model.tsx";
import type {IconType} from "react-icons";
import {FaBolt, FaDumbbell, FaFire, FaRunning, FaSeedling} from "react-icons/fa";
import {MdSelfImprovement, MdTrendingUp} from "react-icons/md";
import {GiMuscleUp, GiProgression, GiWeightLiftingUp} from "react-icons/gi";
import type {ReactNode} from "react";
import type {BadgeVariant} from "../components/badge/badge.component.tsx";

export interface Exercise {
    id: number;
    name: string;
    category?: ExerciseCategory;
    difficulty?: ExerciseDifficulty;
    muscles?: Muscle[];
    workoutExercises: WorkoutExercise[];
}

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

export const ExerciseDifficultyVariants: Record<
    ExerciseDifficulty,
    BadgeVariant
> = {
    NOVICE: "success",
    BEGINNER: "success",
    INTERMEDIATE: "warning",
    ADVANCED: "danger",
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
): BadgeVariant | undefined {
    if (!difficulty) return undefined;

    return ExerciseDifficultyVariants[difficulty];
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
