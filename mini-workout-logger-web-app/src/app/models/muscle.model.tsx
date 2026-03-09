import {Exercise} from './exercise.model';

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
