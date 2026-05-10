import type {ExerciseCategory} from '../models/exercise.model.tsx';

export type ActivityLogReadDTO = {
    id: number;
    exercise_id: number;
    exercise_name: string;
    exercise_category?: ExerciseCategory;
    start_time: string;
    duration_seconds: number | null;
    completed: boolean;
};
