import axios from 'axios';
import type { ApiResponseDTO } from '../dtos/api-response.dto.tsx';
import type { WorkoutExecutionReadDTO } from '../dtos/workout-execution-read.dto.tsx';
import type { FinishWorkoutExecutionWriteDTO } from '../dtos/finish-workout-execution-write.dto.tsx';

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

    async finish(workoutId: string | number, executionId: number, dto: FinishWorkoutExecutionWriteDTO): Promise<WorkoutExecutionReadDTO> {
        const response = await axios.patch<ApiResponseDTO<WorkoutExecutionReadDTO[]>>(
            `${apiUrl}/workouts/${workoutId}/executions/${executionId}/finish?lang=${lang}`,
            dto
        );
        return response.data.data[0];
    }

}

export default new WorkoutExecutionService();
