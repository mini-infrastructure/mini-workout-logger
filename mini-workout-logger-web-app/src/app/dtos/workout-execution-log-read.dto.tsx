export type WorkoutExecutionLogReadDTO = {
    id: number;
    workout_id: number;
    workout_name: string;
    start_time: string;
    duration_seconds: number | null;
    completed: boolean;
};
