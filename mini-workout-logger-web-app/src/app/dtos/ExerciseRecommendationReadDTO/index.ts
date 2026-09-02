import type { ExerciseReadDTO } from '../ExerciseReadDTO/index.ts';

export interface ExerciseRecommendationReadDTO {
    exercise: ExerciseReadDTO;
    score: number;
    exact_match: boolean;
}
