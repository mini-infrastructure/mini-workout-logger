import type {Workout} from "./workout.model.tsx";
import type {Exercise, ExerciseEquipment} from "./exercise.model.tsx";
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
