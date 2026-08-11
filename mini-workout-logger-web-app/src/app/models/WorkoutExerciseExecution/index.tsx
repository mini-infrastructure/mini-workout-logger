import type {WorkoutExecution} from "../WorkoutExecution/index.tsx";
import type {WorkoutExercise} from "../WorkoutExercise/index.tsx";
import type {SetExecution} from "../SetExecution/index.tsx";

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
