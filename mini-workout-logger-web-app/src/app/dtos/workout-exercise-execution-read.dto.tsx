import type {SetExecutionReadDTO} from "./set-execution-read.dto.tsx";

export interface WorkoutExerciseExecutionReadDTO {
    id: number;
    set_executions: SetExecutionReadDTO[];
    completed: boolean;
    startTime: string;
    endTime: string;
}