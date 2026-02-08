import type {Workout} from "./workout.model.tsx";
import type {Exercise} from "./exercise.model.tsx";
import type {Set} from "./set.model.tsx";
import type {WorkoutExerciseExecution} from "./workout-exercise-execution.model.tsx";

export interface WorkoutExercise {
    id: number;
    workout: Workout;
    position: number;
    exercise: Exercise;
    sets: Set[];
    equipment: ExerciseEquipment;
    restTimeSeconds: number;
    executions: WorkoutExerciseExecution[];
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