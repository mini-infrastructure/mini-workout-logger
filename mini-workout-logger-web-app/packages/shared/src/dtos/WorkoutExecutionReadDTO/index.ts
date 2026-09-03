import type { WorkoutExerciseExecutionReadDTO } from "../WorkoutExerciseExecutionReadDTO";

export interface WorkoutExecutionReadDTO {
    id: number;
    workout_exercise_executions: WorkoutExerciseExecutionReadDTO[];
    completed: boolean;
    start_time: string;
    end_time: string;
}
