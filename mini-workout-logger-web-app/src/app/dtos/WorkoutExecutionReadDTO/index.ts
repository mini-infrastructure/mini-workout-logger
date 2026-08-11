import type { WorkoutExerciseExecutionReadDTO } from "../WorkoutExerciseExecutionReadDTO/index.ts";

export interface WorkoutExecutionReadDTO {
    id: number;
    workout_exercise_executions: WorkoutExerciseExecutionReadDTO[];
    completed: boolean;
    start_time: string;
    end_time: string;
}
