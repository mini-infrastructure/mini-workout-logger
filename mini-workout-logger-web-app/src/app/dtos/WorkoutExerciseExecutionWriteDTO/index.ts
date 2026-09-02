import type {SetExecutionWriteDTO} from "../SetExecutionWriteDTO/index.ts";

export interface WorkoutExerciseExecutionWriteDTO {
    workout_exercise_id: number;
    set_executions: SetExecutionWriteDTO[];
}