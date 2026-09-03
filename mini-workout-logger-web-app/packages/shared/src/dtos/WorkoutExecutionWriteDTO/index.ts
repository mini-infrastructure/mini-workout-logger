import type {WorkoutExerciseExecutionWriteDTO} from "../WorkoutExerciseExecutionWriteDTO";

export interface WorkoutExecutionWriteDTO {
    workout_id: number;
    workout_exercise_executions: WorkoutExerciseExecutionWriteDTO[];
}