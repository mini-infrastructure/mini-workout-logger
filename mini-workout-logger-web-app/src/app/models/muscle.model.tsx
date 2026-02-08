import { Exercise } from './exercise.model';

export interface Muscle {
    id: number;
    name: string;
    muscleGroups?: Muscle[];
    muscles?: Muscle[];
    exercises?: Exercise[];
}