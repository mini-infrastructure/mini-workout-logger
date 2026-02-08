import type {SetExecutionWriteDTO} from "./set-execution-write.dto.tsx";

export interface WorkoutExerciseExecutionWriteDTO {
    workout_exercise_id: number;
    set_executions: SetExecutionWriteDTO[];
}