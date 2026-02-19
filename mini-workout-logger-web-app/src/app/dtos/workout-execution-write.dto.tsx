import type {WorkoutExerciseExecutionWriteDTO} from "./workout-exercise-execution-write.dto.tsx";

export interface WorkoutExecutionWriteDTO {
    workout_id: number;
    workout_exercise_executions: WorkoutExerciseExecutionWriteDTO[];
}