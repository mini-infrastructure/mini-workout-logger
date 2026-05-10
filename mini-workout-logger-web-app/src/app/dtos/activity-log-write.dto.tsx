export type ActivityLogWriteDTO = {
    exercise_id: number;
    start_time?: string;
    duration_seconds?: number;
    completed?: boolean;
};
