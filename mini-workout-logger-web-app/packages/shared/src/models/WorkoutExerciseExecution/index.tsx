import type {WorkoutExecution} from "../WorkoutExecution";
import type {WorkoutExercise} from "../WorkoutExercise";
import type {SetExecution} from "../SetExecution";

export interface WorkoutExerciseExecution {
    id: number;
    workoutExecution: WorkoutExecution;
    workoutExercise: WorkoutExercise;
    setExecutions: SetExecution[];
    skipped: boolean;
    startTime: string;
    endTime: string;
    completed: boolean;
}
