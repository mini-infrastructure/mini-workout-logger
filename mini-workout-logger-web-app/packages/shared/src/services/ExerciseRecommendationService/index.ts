import axios from 'axios';
import type { ApiResponseDTO } from '../../dtos/ApiResponseDTO';
import type { ExerciseRecommendationReadDTO } from '../../dtos/ExerciseRecommendationReadDTO';

const apiUrl = import.meta.env.VITE_API_URL;
const lang = import.meta.env.VITE_API_LANGUAGE || 'en_US';

class ExerciseRecommendationService {
    async getRecommendations(
        exerciseId: number,
        params: { minScore?: number; limit?: number } = {}
    ): Promise<ExerciseRecommendationReadDTO[]> {
        try {
            const response = await axios.get<ApiResponseDTO<ExerciseRecommendationReadDTO[]>>(
                `${apiUrl}/exercises/${exerciseId}/recommendations`,
                { params: { lang, ...params } }
            );
            return response.data.data ?? [];
        } catch (error) {
            console.error('Error getting exercise recommendations:', error);
            return [];
        }
    }
}

export default new ExerciseRecommendationService();
