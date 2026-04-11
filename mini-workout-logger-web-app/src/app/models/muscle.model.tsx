import {Exercise} from './exercise.model';
import type {IconType} from "react-icons";
import {
    FcAlarmClock,
    FcBiohazard,
    FcBiotech,
    FcCloseUpMode,
    FcCustomerSupport,
    FcLandscape,
    FcLike
} from "react-icons/fc";

export interface Muscle {
    id: number;
    name: string;
    muscleGroups?: Muscle[];
    muscles?: Muscle[];
    exercises?: Exercise[];
}

export type ExerciseMuscleMovementClassification =
    | 'AGONIST'
    | 'ANTAGONIST'
    | 'TARGET'
    | 'SYNERGIST'
    | 'STABILIZER'
    | 'DYNAMIC_STABILIZER'
    | 'ANTAGONIST_STABILIZER'
    ;

export const RootMuscleIcons: Record<String, IconType> = {
    "Chest": <FcLike />,
    "Core": <FcLandscape />,
    "Shoulders": <FcAlarmClock />,
    "Neck": <FcCustomerSupport />,
    "Arms": <FcCloseUpMode />,
    "Back": <FcBiohazard />,
    "Legs": <FcBiotech />,
};