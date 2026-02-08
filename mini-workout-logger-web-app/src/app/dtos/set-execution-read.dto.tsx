import type {SetReadDTO} from "./set-read.dto.tsx";

export interface SetExecutionReadDTO {
    set: SetReadDTO;
    actual_repetitions: number;
    actual_weight: number;
    actual_duration_seconds: number;
    completed: boolean;
}