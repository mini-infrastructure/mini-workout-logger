import type {Workout} from "../Workout";
import type {Exercise, ExerciseEquipment} from "../Exercise";
import type {Set} from "../Set";
import type {WorkoutExerciseExecution} from "../WorkoutExerciseExecution";

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
