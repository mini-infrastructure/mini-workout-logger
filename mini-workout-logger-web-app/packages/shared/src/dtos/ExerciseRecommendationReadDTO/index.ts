import type { ExerciseReadDTO } from '../ExerciseReadDTO';

export interface ExerciseRecommendationReadDTO {
    exercise: ExerciseReadDTO;
    score: number;
    exact_match: boolean;
}
