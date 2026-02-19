import {Muscle} from './muscle.model';
import type {WorkoutExercise} from "./workout-exercise.model.tsx";

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