import type {Workout} from "../Workout/index.tsx";
import type {Exercise, ExerciseEquipment} from "../Exercise/index.tsx";
import type {Set} from "../Set/index.tsx";
import type {WorkoutExerciseExecution} from "../WorkoutExerciseExecution/index.tsx";

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
