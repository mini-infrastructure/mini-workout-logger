import axios from 'axios';
import type {ApiResponseDTO} from '../dtos/api-response.dto.tsx';
import type {ExerciseStatisticsReadDTO} from '../dtos/exercise-statistics-read.dto.tsx';

const apiUrl = import.meta.env.VITE_API_URL;
const lang   = import.meta.env.VITE_API_LANGUAGE || 'en_US';

class StatisticsService {

    async getExerciseStatistics(exerciseId: number, workoutId?: number): Promise<ExerciseStatisticsReadDTO | null> {
        const query = new URLSearchParams({ lang });
        if (workoutId !== undefined) query.set('workoutId', String(workoutId));
        const response = await axios.get<ApiResponseDTO<ExerciseStatisticsReadDTO[]>>(
            `${apiUrl}/exercises/${exerciseId}/statistics?${query}`
        );
        return response.data.data?.[0] ?? null;
    }

}

export default new StatisticsService();
