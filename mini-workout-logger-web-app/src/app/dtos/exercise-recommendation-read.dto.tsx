import type { ExerciseReadDTO } from './exercise-read.dto.tsx';

export interface ExerciseRecommendationReadDTO {
    exercise: ExerciseReadDTO;
    score: number;
    exact_match: boolean;
}
