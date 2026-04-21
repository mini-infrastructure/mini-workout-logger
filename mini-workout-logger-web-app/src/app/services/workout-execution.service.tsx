import axios from 'axios';
import type { ApiResponseDTO } from '../dtos/api-response.dto.tsx';
import type { WorkoutExecutionReadDTO } from '../dtos/workout-execution-read.dto.tsx';

const apiUrl = import.meta.env.VITE_API_URL;
const lang = import.meta.env.VITE_API_LANGUAGE || 'en_US';

class WorkoutExecutionService {

    async create(workoutId: string | number): Promise<WorkoutExecutionReadDTO> {
        const response = await axios.post<ApiResponseDTO<WorkoutExecutionReadDTO[]>>(
            `${apiUrl}/workouts/${workoutId}/executions?lang=${lang}`,
            { workout_id: Number(workoutId), workout_exercise_executions: [] }
        );
        return response.data.data[0];
    }

    async getAll(workoutId: string | number): Promise<WorkoutExecutionReadDTO[]> {
        const response = await axios.get<ApiResponseDTO<WorkoutExecutionReadDTO[]>>(
            `${apiUrl}/workouts/${workoutId}/executions?lang=${lang}`
        );
        return response.data.data ?? [];
    }

    async delete(workoutId: string | number, executionId: number): Promise<void> {
        await axios.delete(`${apiUrl}/workouts/${workoutId}/executions/${executionId}?lang=${lang}`);
    }

}

export default new WorkoutExecutionService();
