import type {SetExecutionReadDTO} from './set-execution-read.dto.tsx';

export interface ExerciseExecutionHistoryReadDTO {
    id: number;
    workout_execution_id: number;
    workout_name: string;
    execution_date: string;
    completed: boolean;
    set_executions: SetExecutionReadDTO[];
}
