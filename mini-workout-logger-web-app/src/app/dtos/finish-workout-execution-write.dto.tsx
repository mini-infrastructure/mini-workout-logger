export interface SetCompletionWriteDTO {
    set_execution_id: number;
    completed: boolean;
    skipped: boolean;
}

export interface FinishWorkoutExecutionWriteDTO {
    set_executions: SetCompletionWriteDTO[];
}
