import type {SetExecutionWriteDTO} from "../SetExecutionWriteDTO";

export interface WorkoutExerciseExecutionWriteDTO {
    workout_exercise_id: number;
    set_executions: SetExecutionWriteDTO[];
}