import type {WorkoutExerciseExecutionWriteDTO} from "../WorkoutExerciseExecutionWriteDTO/index.ts";

export interface WorkoutExecutionWriteDTO {
    workout_id: number;
    workout_exercise_executions: WorkoutExerciseExecutionWriteDTO[];
}