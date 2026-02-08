import type {WorkoutExerciseExecutionReadDTO} from "./workout-exercise-execution-read.dto.tsx";

export interface WorkoutExecutionReadDTO {
    id: number;
    workout_exercise_executions: WorkoutExerciseExecutionReadDTO[];
    completed: boolean;
    startTime: string;
    endTime: string;
}