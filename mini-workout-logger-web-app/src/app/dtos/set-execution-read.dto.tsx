import type { SetReadDTO } from "./set-read.dto.tsx";

export interface SetExecutionReadDTO {
    id: number;
    set: SetReadDTO;
    actual_repetitions: number | null;
    actual_weight: number | null;
    actual_duration_seconds: number | null;
    completed: boolean;
    skipped: boolean;
    start_time: string;
    end_time: string;
}
