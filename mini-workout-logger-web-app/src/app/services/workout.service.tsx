import type {WorkoutReadDTO} from '../dtos/workout-read.dto.tsx';
import type {WorkoutWriteDTO} from '../dtos/workout-write.dto.tsx';
import axios from 'axios';
import type {ApiResponseDTO} from '../dtos/api-response.dto.tsx';

const apiUrl = import.meta.env.VITE_API_URL;
const lang = import.meta.env.VITE_API_LANGUAGE || 'en_US';

class WorkoutService {

    async getAll(tagIds?: number[]): Promise<WorkoutReadDTO[]> {
        try {
            const params: Record<string, string> = { lang };
            if (tagIds && tagIds.length > 0) params.tags = tagIds.join(',');
            const response = await axios.get<ApiResponseDTO<WorkoutReadDTO[]>>(
                `${apiUrl}/workouts`,
                { params }
            );
            return response.data.data;
        } catch (error) {
            console.error('Error fetching workouts:', error);
            return [];
        }
    }

    async getById(id: string): Promise<WorkoutReadDTO> {
        const response = await axios.get<ApiResponseDTO<WorkoutReadDTO[]>>(
            `${apiUrl}/workouts/${id}?lang=${lang}`
        );
        return response.data.data[0];
    }

    async update(id: string, payload: WorkoutWriteDTO): Promise<WorkoutReadDTO> {
        const response = await axios.put<ApiResponseDTO<WorkoutReadDTO[]>>(
            `${apiUrl}/workouts/${id}?lang=${lang}`,
            payload
        );
        return response.data.data[0];
    }

    async reorderExercise(workoutId: string, exerciseId: number, newPosition: number): Promise<void> {
        await axios.put(
            `${apiUrl}/workouts/${workoutId}/exercises/reorder/${exerciseId}`,
            null,
            { params: { newPosition, lang } }
        );
    }

    async delete(id: string): Promise<void> {
        await axios.delete(`${apiUrl}/workouts/${id}?lang=${lang}`);
    }

}

export default new WorkoutService();
