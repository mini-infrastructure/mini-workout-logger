import type { SetExecutionReadDTO } from "./set-execution-read.dto.tsx";

export interface WorkoutExerciseExecutionReadDTO {
    id: number;
    workout_exercise_id: number;
    set_executions: SetExecutionReadDTO[];
    completed: boolean;
    skipped: boolean;
    startTime: string;
    endTime: string;
}